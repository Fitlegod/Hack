const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {              // Имя пользователя
        type: String,
        required: true,
        minlength: 2,
        maxlength: 15
    },
    email: {             // Email — уникальный идентификатор
        type: String,
        required: true,
        unique: true,      // Чтобы не было двух пользователей с одним email
        lowercase: true,
        trim: true
    },
    passwordHash: {      // Хэш пароля (не сам пароль!)
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);