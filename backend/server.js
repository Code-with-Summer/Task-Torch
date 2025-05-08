const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth'); // Assuming you have login/register
const morgan = require('morgan');

dotenv.config();

const app = express();

// === Middleware ===
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true 
}));
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev')); // Logs requests

// === Routes ===
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// === Health Check ===
app.get('/', (req, res) => {
    res.send('Task Management API is running...');
});

// === MongoDB Connection ===
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
});
