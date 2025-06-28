const express = require("express");
const router = express.Router();
const { OpenAI } = require("openai");
const Flat = require("./models/Flat");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/", async (req, res) => {
    const { prompt } = req.body;

    const contextData = await Flat.find().limit(50); // подтягиваем часть базы
    const flatList = contextData.map(flat => (
        `${flat.title}, ${flat.price} руб, ${flat.address}`
    )).join("\n");

    const fullPrompt = `
Ты — помощник по недвижимости. Ответь на запрос пользователя.
Вот база квартир:

${flatList}

Вопрос пользователя: ${prompt}
`;

    const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: fullPrompt }],
    });

    res.json({ reply: completion.choices[0].message.content });
});

module.exports = router;
