import express from "express";
import { createPost, getPosts } from "../controllers/postController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// ✅ Fetch all posts (public)
router.get("/", getPosts);

// ✅ Create a post (protected)
router.post("/", auth, createPost);

export default router;
