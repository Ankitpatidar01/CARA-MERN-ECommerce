import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 5
  },
  category: {
    type: String,
    enum: ["featured", "newArrival"],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("Product", productSchema);