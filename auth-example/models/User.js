const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 15
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    key: {                // 👈 Добавь это поле
        type: String,
        enum: ['user', 'admin'], // можно только 'user' или 'admin'
        default: 'user'
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);