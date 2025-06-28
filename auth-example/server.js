require('dotenv').config(); // Загружаем .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { OpenAI } = require('openai');
const multer = require('multer');
const path = require('path');

const authRoutes = require('./routes/auth'); // если есть
const assistantRoute = require('./routes/apartments'); // если есть

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Роуты
app.use('/api/auth', authRoutes); // если используется

// MongoDB через Mongoose (для auth и стандартных моделей)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB (mongoose) connected'))
    .catch(err => console.error('❌ Mongoose connection error:', err));

// MongoDB через MongoClient (для ручных запросов)
const client = new MongoClient(process.env.MONGO_URI);


// Настройка multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});
const upload = multer({ storage: storage });



app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

const apartmentsRoute = require('./routes/apartments');
app.use('/api/apartments', apartmentsRoute); // ← подключаем роут

// Запуск сервера
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

