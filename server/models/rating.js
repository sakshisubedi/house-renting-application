const mongoose = require("mongoose");

// Rating Collection Schema
const ratingSchema = new mongoose.Schema({
    listingId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Listing',
        required: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = ratingSchema;