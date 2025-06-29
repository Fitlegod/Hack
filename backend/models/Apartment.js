import mongoose from "mongoose";

const apartmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  housingClass: {
    type: String,
    enum: ["Эконом", "Комфорт", "Бизнес", "Премиум"],
    required: true,
  },
  developer: {
    type: String,
    trim: true,
  },
  parameters: {
    rooms: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    area: {
      type: Number,
      required: true,
      min: 10,
      max: 1000,
    },
    floor: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
    maxFloor: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
    price: {
      type: Number,
      required: true,
      min: 10000,
    },
  },
  address: {
    street: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    zip: {
      type: String,
      required: true,
      match: /^[0-9]{6}$/,
    },
    block: {
      type: String,
      trim: true,
    },
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  images: [
    {
      id: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
      originalName: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Обновляем updatedAt при каждом изменении
apartmentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Парсим координаты из строки
apartmentSchema.methods.setCoordinates = function (coordsString) {
  const [lat, lng] = coordsString
    .split(",")
    .map((coord) => parseFloat(coord.trim()));
  this.address.coordinates = { lat, lng };
};

const Apartment = mongoose.model("Apartment", apartmentSchema);

export default Apartment;
