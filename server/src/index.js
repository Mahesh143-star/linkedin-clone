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

// ✅ JSON Parser
app.use(express.json());

// ✅ Production & Development CORS
const allowedOrigins = [
  'http://localhost:3000',                     // Local frontend
  'https://linkedin-clone.vercel.app',         // Replace with your actual Vercel domain
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS not allowed for this origin: ' + origin));
      }
    },
    credentials: true,
  })
);

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// ✅ Health Check Route
app.get('/', (req, res) => {
  res.send('✅ API is running...');
});

// ✅ Global 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
