import prisma from "../prismaClient.js";

// ✅ Fetch all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: { select: { id: true, name: true, email: true } }, // Include author info
      },
    });
    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err.message);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

// ✅ Create a new post
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) return res.status(400).json({ message: "Content is required" });
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const newPost = await prisma.post.create({
      data: {
        content,
        authorId: req.userId,
      },
      include: {
        author: { select: { id: true, name: true, email: true } },
      },
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.error("Error creating post:", err.message);
    res.status(500).json({ message: "Failed to create post" });
  }
};
