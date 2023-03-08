const mongoose = require("mongoose");

// Comment Collection Schema
const commentSchema = new mongoose.Schema({
    parentId: {
        type: mongoose.Schema.ObjectId,
        default: null
    },
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
    },
    comment: {
        type: String
    },
    media: [{
        type: String
    }]
});

module.exports = commentSchema;