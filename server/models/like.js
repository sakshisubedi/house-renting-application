const mongoose = require("mongoose");

// Like Collection Schema
const likeSchema = new mongoose.Schema({
    commentId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment',
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

module.exports = likeSchema;