import express from 'express';
import prisma from '../prismaClient.js';

const router = express.Router();

// Example: Get all users
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
