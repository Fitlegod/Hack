const express = require('express');
const bcrypt = require('bcrypt');  // Для безопасного хранения паролей
const { body, validationResult } = require('express-validator');  // Для валидации
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const router = express.Router();

// Регистрация пользователя
router.post('/register', [
    // Проверяем имя (от 2 до 15 символов)
    body('name').isLength({ min: 2, max: 15 }).withMessage('Имя от 2 до 15 символов'),
    // Проверяем, что email — корректный формат
    body('email').isEmail().withMessage('Некорректный email'),
    // Проверяем пароль (минимум 6 символов)
    body('password').isLength({ min: 6 }).withMessage('Пароль минимум 6 символов'),
], async (req, res) => {
    // Проверяем ошибки валидации
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
        // Проверяем, существует ли уже пользователь с таким email
        const candidate = await User.findOne({ email });
        if (candidate) {
            return res.status(400).json({ errors: [{ msg: 'Email уже используется' }] });
        }

        // Создаем хэш пароля (безопасно)
        const passwordHash = await bcrypt.hash(password, 10);

        // Создаем нового пользователя и сохраняем в базе
        const user = new User({ name, email, passwordHash });
        await user.save();

        res.status(201).json({ msg: 'Пользователь зарегистрирован' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: [{ msg: 'Ошибка сервера' }] });
    }
});

// Вход пользователя
router.post('/login', [
    body('email').isEmail().withMessage('Некорректный email'),
    body('password').exists().withMessage('Пароль обязателен'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
        // Ищем пользователя по email
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ errors: [{ msg: 'Пользователь не найден' }] });

        // Сравниваем введенный пароль с хэшем в базе
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch)
            return res.status(400).json({ errors: [{ msg: 'Неверный пароль' }] });

        // Если пароль верный, создаем токен для сессии
        const token = jwt.sign(
            { userId: user._id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, name: user.name, email: user.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: [{ msg: 'Ошибка сервера' }] });
    }
});

module.exports = router;
