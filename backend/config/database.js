import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MONGO_URI не найден в переменных окружения");
    }

    // Проверяем, что в URI указана база данных site
    if (!mongoURI.includes("/site")) {
      console.warn('⚠️ Внимание: MONGO_URI не содержит базу данных "site"');
      console.warn(
        "💡 Убедитесь, что connection string заканчивается на /site"
      );
    }

    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB Atlas подключена успешно");
    console.log("📊 База данных:", mongoose.connection.name);

    // Проверяем, что мы в правильной базе данных
    if (mongoose.connection.name !== "site") {
      console.warn(
        `⚠️ Подключены к базе данных "${mongoose.connection.name}", ожидалась "site"`
      );
      console.warn(
        "💡 Обновите MONGO_URI, добавив /site в конец connection string"
      );
    }
  } catch (error) {
    console.error("❌ Ошибка подключения к MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
