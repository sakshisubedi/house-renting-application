const mongoose = require("mongoose");

// Wishlist Collection Schema
const wishlistSchema = new mongoose.Schema({
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
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = wishlistSchema;