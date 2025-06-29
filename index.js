import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import connectDB from "./backend/config/database.js";
import authRoutes from "./backend/auth/routes/auth.js";
import objectsRoutes from "./backend/routes/objects.js";

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Fallback to 3000 if PORT not defined
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware для парсинга multipart/form-data
app.use((req, res, next) => {
  if (
    req.headers["content-type"] &&
    req.headers["content-type"].includes("multipart/form-data")
  ) {
    // Для multipart данных body будет доступно после multer
    next();
  } else {
    next();
  }
});

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Получаем тип из query параметра или из поля type в body
    const type = req.query.type || req.body.type || "avatar";
    console.log("Определен тип файла:", type);
    console.log("Query параметры:", req.query);
    console.log("Body параметры:", req.body);

    let uploadPath;

    if (type === "object") {
      // Фотографии объектов
      uploadPath = path.join(__dirname, "public", "media", "objects");
      console.log("Путь для объектов:", uploadPath);
    } else {
      // Аватары пользователей
      const year = new Date().getFullYear();
      uploadPath = path.join(__dirname, "public", "media", year.toString());
      console.log("Путь для аватаров:", uploadPath);
    }

    // Создаем папку если её нет
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Генерируем уникальный ID для файла
    const imageId = Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    const ext = path.extname(file.originalname);
    cb(null, imageId + ext);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB лимит
  },
  fileFilter: function (req, file, cb) {
    // Проверяем тип файла
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Только изображения разрешены"), false);
    }
  },
});

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, "public")));
// Добавляю отдачу статики для /admin
app.use("/admin", express.static(path.join(__dirname, "public", "admin")));
// Добавляю отдачу статики для media файлов
app.use(
  "/static/media",
  express.static(path.join(__dirname, "public", "media"))
);

// Маршрут для загрузки изображений
app.post("/upload-image", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Файл не был загружен" });
    }

    const type = req.body.type || "avatar";
    console.log("Тип загружаемого файла:", type);
    console.log("Тело запроса:", req.body);

    let relativePath;

    if (type === "object") {
      // Фотографии объектов
      relativePath = `/static/media/objects/${req.file.filename}`;
      console.log("Файл сохраняется в objects:", relativePath);
    } else {
      // Аватары пользователей
      const year = new Date().getFullYear();
      relativePath = `/static/media/${year}/${req.file.filename}`;
      console.log("Файл сохраняется в year:", relativePath);
    }

    const imageId = path.basename(
      req.file.filename,
      path.extname(req.file.filename)
    );

    res.json({
      success: true,
      imagePath: relativePath,
      imageId: imageId,
      originalName: req.file.originalname,
      type: type,
    });
  } catch (error) {
    console.error("Ошибка загрузки файла:", error);
    res.status(500).json({ error: "Ошибка загрузки файла" });
  }
});

// Routes
app.use("/auth", authRoutes);
app.use("/objects", objectsRoutes);

// Serve HTML pages
app.get("/registration", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "registration.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Добавляю маршрут для /admin и /admin/main
app.get(["/admin", "/admin/main"], (req, res) => {
  res.sendFile(path.join(__dirname, "backend", "templates", "admin_main.html"));
});

// Добавляю маршрут для /admin/add-object
app.get("/admin/add-object", (req, res) => {
  res.sendFile(path.join(__dirname, "backend", "templates", "add_object.html"));
});

// Добавляю маршрут для /admin/objects
app.get("/admin/objects", (req, res) => {
  res.sendFile(
    path.join(__dirname, "backend", "templates", "admin_objects.html")
  );
});

// Добавляю маршрут для /admin/map
app.get("/admin/map", (req, res) => {
  res.sendFile(path.join(__dirname, "backend", "templates", "admin_map.html"));
});

// Basic route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "backend", "templates", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  console.log(`📝 Регистрация: http://localhost:${PORT}/registration`);
  console.log(`🔐 Авторизация: http://localhost:${PORT}/login`);
});
