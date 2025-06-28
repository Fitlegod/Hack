require('dotenv').config(); // Загружаем .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { OpenAI } = require('openai');

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

// Инициализация OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// GPT-ассистент по поиску квартир
app.post('/ask', async (req, res) => {
    const userQuestion = req.body.question;

    try {
        const prompt = `
Ты — ИИ-ассистент, который помогает найти квартиру. Вопрос от пользователя: "${userQuestion}".
Ответь кратко, в виде списка или описания, а затем добавь список ID квартир, которые нужно найти в базе.

Формат ответа:
Описание: ...
IDs: ["1", "3", "5"]
    `;

        const chat = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
        });

        const aiResponse = chat.choices[0].message.content;
        const idsMatch = aiResponse.match(/IDs:\s*\[([^\]]+)\]/);
        const ids = idsMatch
            ? idsMatch[1].split(',').map(id => id.replace(/["']/g, '').trim())
            : [];

        await client.connect();
        const db = client.db('yourDatabaseName');
        const apartments = db.collection('yourCollectionName');

        const listings = await apartments
            .find({ _id: { $in: ids } })
            .toArray();

        res.json({ answer: aiResponse, listings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при обработке запроса' });
    }
});

// Запуск сервера
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));


