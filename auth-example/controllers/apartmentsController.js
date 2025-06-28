const Apartment = require('../models/Apartment');

exports.createApartment = async (req, res) => {
    try {
        const {
            title,
            price,
            address,
            developer,
            lat,
            lng,
            floor,
            class: housingClass,
            rooms,
            link
        } = req.body;

        const image = req.file ? `/uploads/${req.file.filename}` : '';

        const apartment = new Apartment({
            title,
            price,
            address,
            developer,
            lat,
            lng,
            floor,
            class: housingClass,
            rooms,
            image,
            link
        });

        await apartment.save();
        res.status(201).json({ message: 'Квартира добавлена', apartment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при сохранении квартиры' });
    }
};
