const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
