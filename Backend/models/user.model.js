import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    house: String,

    area: String,

    city: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    pincode: {
        type: String,
        required: true
    },

    country: {
        type: String,
        default: "India"
    },

    isDefault: {
        type: Boolean,
        default: false
    }

}, { _id: true });


const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        default: ""
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        default: "Other"
    },

    dob: {
        type: Date
    },

    profileImage: {
        type: String,
        default: ""
    },

    addresses: [addressSchema],

    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    },

    refreshToken: {
        type: String,
        default: null
    }

}, {
    timestamps: true
});

export default mongoose.model("users", userSchema);