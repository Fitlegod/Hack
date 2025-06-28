const mongoose = require("mongoose");

const flatSchema = new mongoose.Schema({
    title: String,
    price: Number,
    address: String,
    developer: String,
    lat: Number,
    lng: Number,
    class: String,
    rooms: Number,
    image: String,
    link: String
});

module.exports = mongoose.model("Flat", flatSchema);
