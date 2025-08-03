import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET is missing in .env');
  process.exit(1);
}

const app = express();

// Enable JSON & CORS
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
