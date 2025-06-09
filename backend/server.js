const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');


dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes')); // ✅ Auth route added
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/videos', require('./routes/videoRoutes'));
app.use('/api/quizzes', require('./routes/quizRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
