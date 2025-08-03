import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable JSON & CORS
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// ✅ Health check
app.get('/', (req, res) => res.send('✅ API is running...'));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// ❌ 404 handler
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// ✅ Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
