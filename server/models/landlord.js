const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

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

// password security
// Hash the landlord's password by bcrypt
landlordSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
});

// Compare landlord's hashed password
landlordSchema.methods.comparePassword = async function (password) {
    const result = await bcrypt.compare(password, this.password);
    return result;
};

module.exports = landlordSchema;