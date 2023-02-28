const mongoose = require("mongoose");

// Listing Collection Schema
const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    rent: {
        type: Number,
        required: true
    },
    landlordId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Landlord',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    media: [{
        type: String
    }],
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    squareFeet: {
        type: Number,
        required: true
    },
    hasPet: {
        type: Boolean,
        default: false
    },
    postalCode: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = listingSchema;