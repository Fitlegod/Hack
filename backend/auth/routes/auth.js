import express from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Генерация JWT токена
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "24h" });
};

// Регистрация
router.post(
  "/registration",
  [
    body("login")
      .isLength({ min: 3, max: 50 })
      .withMessage("Логин должен содержать от 3 до 50 символов")
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage("Логин может содержать только буквы, цифры и подчеркивания"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Пароль должен содержать минимум 6 символов"),
  ],
  async (req, res) => {
    try {
      // Проверка валидации
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Ошибка валидации",
          errors: errors.array(),
        });
      }

      const { login, password } = req.body;

      // Проверка существования пользователя
      const existingUser = await User.findOne({ login });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким логином уже существует" });
      }

      // Создание нового пользователя
      const user = new User({ login, password });
      await user.save();

      // Генерация токена
      const token = generateToken(user._id);

      res.status(201).json({
        message: "Пользователь успешно зарегистрирован",
        token,
        user: {
          id: user._id,
          login: user.login,
        },
      });
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }
);

// Авторизация
router.post(
  "/login",
  [
    body("login").notEmpty().withMessage("Логин обязателен"),
    body("password").notEmpty().withMessage("Пароль обязателен"),
  ],
  async (req, res) => {
    try {
      // Проверка валидации
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Ошибка валидации",
          errors: errors.array(),
        });
      }

      const { login, password } = req.body;

      // Поиск пользователя
      const user = await User.findOne({ login });
      if (!user) {
        return res.status(400).json({ message: "Неверный логин или пароль" });
      }

      // Проверка пароля
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Неверный логин или пароль" });
      }

      // Генерация токена
      const token = generateToken(user._id);

      res.json({
        message: "Успешная авторизация",
        token,
        user: {
          id: user._id,
          login: user.login,
        },
      });
    } catch (error) {
      console.error("Ошибка авторизации:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }
);

// Получение профиля пользователя (защищенный маршрут)
router.get("/profile", auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        login: req.user.login,
        createdAt: req.user.createdAt,
      },
    });
  } catch (error) {
    console.error("Ошибка получения профиля:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

export default router;
