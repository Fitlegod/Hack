const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
    title: String,
    price: Number,
    address: String,
    developer: String,
    lat: Number,
    lng: Number,
    floor: Number,
    class: String,
    rooms: Number,
    image: String,
    link: String
});

module.exports = mongoose.model('Apartment', apartmentSchema);
