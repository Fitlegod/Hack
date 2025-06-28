const express = require('express');
const multer = require('multer');
const path = require('path');
const { createApartment } = require('../controllers/apartmentsController');

const router = express.Router();

// Настройка multer для загрузки изображений
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// POST /api/apartments — создание новой квартиры
router.post('/', upload.single('images'), createApartment);

module.exports = router;
