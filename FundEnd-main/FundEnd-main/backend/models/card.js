const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
    name: { 
        type: String,  
        trim: true },
    amountDonated: { 
        type: Number,  
        min: 0 },
    date: { type: Date, 
        default: Date.now 
    }
});

const cardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    fundsRequired: { type: Number, required: true, min: 0 },
    fundsReceived: { type: Number, default: 0, min: 0 },
    progress: [{
        text: { type: String, required: true },
        date: { type: Date, default: Date.now }
    }],
    place: { type: String, required: true },
    donors: [donorSchema],
    createdBy: { type: String, required: true, trim: true } // Store creator's name instead of user ID
}, { timestamps: true });

module.exports = mongoose.model('Card', cardSchema);
