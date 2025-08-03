import prisma from '../prismaClient.js';
import jwt from 'jsonwebtoken';

export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({ include: { author: true } });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPost = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { content } = req.body;

    const post = await prisma.post.create({
      data: {
        content,
        author: { connect: { id: decoded.id } },
      },
    });

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
