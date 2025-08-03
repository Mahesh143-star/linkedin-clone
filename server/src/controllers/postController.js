import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'Content is required' });

    const post = await prisma.post.create({
      data: { content, authorId: req.userId },
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post' });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(posts);
  } catch {
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await prisma.post.findMany({
      where: { authorId: Number(id) },
      include: { author: true },
    });
    res.json(posts);
  } catch {
    res.status(500).json({ message: 'Failed to fetch user posts' });
  }
};
