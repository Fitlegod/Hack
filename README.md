# Система авторизации

Простая система авторизации с использованием Node.js, Express, MongoDB Atlas и JWT токенов.

## Функциональность

- ✅ Регистрация пользователей
- ✅ Авторизация пользователей
- ✅ Хэширование паролей с bcrypt
- ✅ JWT токены для аутентификации
- ✅ Валидация данных
- ✅ Современный UI

## Установка

1. Установите зависимости:
```bash
npm install
```

2. Создайте файл `.env` в корне проекта:
```env
# Порт сервера
PORT=3000

# MongoDB Atlas URI
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/site?retryWrites=true&w=majority

# JWT Secret (в продакшене используйте более сложный секрет)
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

3. **Настройка MongoDB Atlas:**
   - Создайте аккаунт на [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Создайте новый кластер (бесплатный tier)
   - Создайте пользователя базы данных
   - Добавьте ваш IP адрес в Network Access
   - Получите connection string и замените `username`, `password` и `cluster` на ваши данные

## Запуск

### Тестирование подключения к MongoDB
```bash
node test-mongo.js
```

### Режим разработки
```bash
npm run dev
```

### Обычный запуск
```bash
node index.js
```

## API Endpoints

### Регистрация
- **POST** `/auth/registration`
- Body: `{ "login": "username", "password": "password123" }`

### Авторизация
- **POST** `/auth/login`
- Body: `{ "login": "username", "password": "password123" }`

### Профиль пользователя
- **GET** `/auth/profile`
- Headers: `Authorization: Bearer <token>`

## Страницы

- **Главная**: `http://localhost:3000/`
- **Регистрация**: `http://localhost:3000/registration`
- **Авторизация**: `http://localhost:3000/login`

## Структура проекта

```
hackaton/
├── backend/
│   ├── auth/
│   │   ├── models/
│   │   │   └── User.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   └── routes/
│   │       └── auth.js
│   ├── config/
│   │   └── database.js
│   └── templates/
│       └── index.html
├── public/
│   ├── registration.html
│   └── login.html
├── test-mongo.js
├── index.js
├── package.json
└── README.md
```

## База данных

- **База данных**: `site`
- **Коллекция**: `auth_users`
- **Поля**: `login`, `password` (зашифрованный), `createdAt`, `updatedAt`

## Технологии

- **Backend**: Node.js, Express
- **База данных**: MongoDB Atlas с Mongoose
- **Аутентификация**: JWT токены
- **Хэширование**: bcrypt
- **Валидация**: express-validator
- **Frontend**: HTML, CSS, JavaScript

# Buildy - Платформа недвижимости

## Система загрузки изображений

### Структура хранения файлов
Изображения сохраняются в следующей структуре:
```
public/
  media/
    2025/                    # Аватары пользователей
      {image_id}.jpg
      {image_id}.png
      ...
    objects/                  # Фотографии объектов недвижимости
      {photo_id}.jpg
      {photo_id}.png
      ...
```

### Пути в базе данных
В базу данных сохраняется относительный путь:
- **Аватары**: `/static/media/2025/{image_id}`
- **Фотографии объектов**: `/static/media/objects/{photo_id}`

### API для загрузки
**POST** `/upload-image`

**Параметры:**
- `image` - файл изображения (multipart/form-data)
- `type` - тип изображения: `avatar` или `object` (по умолчанию `avatar`)

**Ограничения:**
- Максимальный размер: 5MB
- Разрешенные форматы: изображения (image/*)

**Ответ:**
```json
{
  "success": true,
  "imagePath": "/static/media/objects/1734567890_abc123def.jpg",
  "imageId": "1734567890_abc123def",
  "originalName": "photo.jpg",
  "type": "object"
}
```

### Использование в формах
При загрузке изображений через формы автоматически создаются скрытые поля:
```html
<input type="hidden" name="images[]" value="/static/media/objects/photo_id.jpg">
```

### Примеры использования
1. **Загрузка аватара пользователя** - файл сохраняется в `/public/media/2025/` и путь `/static/media/2025/` сохраняется в localStorage
2. **Загрузка фотографий объектов** - файлы сохраняются в `/public/media/objects/` и пути передаются в форме

### Примеры запросов
```javascript
// Загрузка аватара
const formData = new FormData();
formData.append('image', file);
formData.append('type', 'avatar');

// Загрузка фотографии объекта
const formData = new FormData();
formData.append('image', file);
formData.append('type', 'object');
```