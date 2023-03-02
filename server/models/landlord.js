const mongoose = require("mongoose");

// Landlord Collection Schema
const landlordSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    pronoun: {
        type: String,
        default: null
    },
    age: {
        type: Number,
        min: 0,
        max: 100,
        default: null
    },
    phoneNo: {
        type: String,
        default: null
    },
    introduction: {
        type: String,
        default: null
    },
    profilePicture: {
        type: String,
        default: null
    }
}, { timestamps: true });

module.exports = landlordSchema;