import mongoose from "mongoose";

const apartmentComplexSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  developer: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["Планируется", "Строится", "Построен"],
    required: true,
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
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  stages: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
    },
  ],
  amenities: [
    {
      type: String,
      enum: [
        "Детская площадка",
        "Парковка",
        "Фитнес-зал",
        "Бассейн",
        "Магазин",
        "Школа",
      ],
    },
  ],
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
apartmentComplexSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Парсим координаты из строки
apartmentComplexSchema.methods.setCoordinates = function (coordsString) {
  const [lat, lng] = coordsString
    .split(",")
    .map((coord) => parseFloat(coord.trim()));
  this.address.coordinates = { lat, lng };
};

const ApartmentComplex = mongoose.model(
  "ApartmentComplex",
  apartmentComplexSchema
);

export default ApartmentComplex;
