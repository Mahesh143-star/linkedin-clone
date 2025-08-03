import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/:id', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
    include: { posts: true },
  });

  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

export default router;
