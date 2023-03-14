const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

// User Collection Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        isPublic: {
            type: Boolean,
            default: false
        },
        data: {
            type: String,
            required: true,
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    pronoun: {
        type: String,
        default: null
    },
    age: {
        isPublic: {
            type: Boolean,
            default: false
        },
        data: {
            type: Number,
            min: 0,
            max: 100,
            default: null
        }
    },
    occupation: {
        isPublic: {
            type: Boolean,
            default: false
        },
        data: {
            type: String,
            default: null
        }
    },
    preferredMoveInDate: {
        type: Date,
        default: null
    },
    preferPet: {
        type: Boolean,
        default: false
    },
    isLookingForFlatmate: {
        type: Boolean,
        default: false
    },
    profilePicture: {
        type: String,
        default: null
    }
}, { timestamps: true });

// password security
// Hash the user's password by bcrypt
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
});

// Compare landlord's hashed password
userSchema.methods.comparePassword = async function (password) {
    const result = await bcrypt.compare(password, this.password);
    return result;
};

module.exports = userSchema;