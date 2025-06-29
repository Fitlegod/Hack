import express from "express";
import ApartmentComplex from "../models/ApartmentComplex.js";
import Apartment from "../models/Apartment.js";

const router = express.Router();

// Добавление ЖК
router.post("/add-complex", async (req, res) => {
  try {
    const {
      jk_name,
      developer,
      status,
      street,
      city,
      zip,
      coords,
      stage_name,
      stage_start,
      stage_end,
      amenities,
      images,
    } = req.body;

    // Создаем объект ЖК
    const complex = new ApartmentComplex({
      name: jk_name,
      developer,
      status,
      address: {
        street,
        city,
        zip,
      },
      amenities: amenities || [],
      images: [],
    });

    // Парсим координаты
    if (coords) {
      complex.setCoordinates(coords);
    }

    // Добавляем этапы строительства
    if (stage_name && Array.isArray(stage_name)) {
      complex.stages = stage_name.map((name, index) => ({
        name,
        startDate: new Date(stage_start[index]),
        endDate: new Date(stage_end[index]),
      }));
    }

    // Обрабатываем изображения
    if (images && Array.isArray(images)) {
      complex.images = images.map((imagePath) => {
        // Извлекаем ID из пути /static/media/objects/{id}.{ext}
        const pathParts = imagePath.split("/");
        const filename = pathParts[pathParts.length - 1];
        const id = filename.split(".")[0];
        const ext = filename.split(".")[1];

        return {
          id: id,
          path: imagePath,
          originalName: filename,
        };
      });
    }

    await complex.save();

    res.json({
      success: true,
      message: "ЖК успешно добавлен",
      complexId: complex._id,
    });
  } catch (error) {
    console.error("Ошибка добавления ЖК:", error);
    res.status(500).json({
      success: false,
      message: "Ошибка при добавлении ЖК",
      error: error.message,
    });
  }
});

// Добавление квартиры
router.post("/add-apartment", async (req, res) => {
  try {
    const {
      title,
      housing_class,
      developer,
      rooms,
      area,
      floor,
      max_floor,
      price,
      street,
      city,
      zip,
      block,
      coords,
      url,
      desc,
      images,
    } = req.body;

    // Создаем объект квартиры
    const apartment = new Apartment({
      title,
      housingClass: housing_class,
      developer,
      parameters: {
        rooms: parseInt(rooms),
        area: parseFloat(area),
        floor: parseInt(floor),
        maxFloor: parseInt(max_floor),
        price: parseInt(price),
      },
      address: {
        street,
        city,
        zip,
        block,
      },
      url,
      description: desc,
      images: [],
    });

    // Парсим координаты
    if (coords) {
      apartment.setCoordinates(coords);
    }

    // Обрабатываем изображения
    if (images && Array.isArray(images)) {
      apartment.images = images.map((imagePath) => {
        // Извлекаем ID из пути /static/media/objects/{id}.{ext}
        const pathParts = imagePath.split("/");
        const filename = pathParts[pathParts.length - 1];
        const id = filename.split(".")[0];
        const ext = filename.split(".")[1];

        return {
          id: id,
          path: imagePath,
          originalName: filename,
        };
      });
    }

    await apartment.save();

    res.json({
      success: true,
      message: "Квартира успешно добавлена",
      apartmentId: apartment._id,
    });
  } catch (error) {
    console.error("Ошибка добавления квартиры:", error);
    res.status(500).json({
      success: false,
      message: "Ошибка при добавлении квартиры",
      error: error.message,
    });
  }
});

// Получение всех ЖК
router.get("/complexes", async (req, res) => {
  try {
    const complexes = await ApartmentComplex.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      complexes,
    });
  } catch (error) {
    console.error("Ошибка получения ЖК:", error);
    res.status(500).json({
      success: false,
      message: "Ошибка при получении ЖК",
    });
  }
});

// Получение всех квартир
router.get("/apartments", async (req, res) => {
  try {
    const apartments = await Apartment.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      apartments,
    });
  } catch (error) {
    console.error("Ошибка получения квартир:", error);
    res.status(500).json({
      success: false,
      message: "Ошибка при получении квартир",
    });
  }
});

export default router;
