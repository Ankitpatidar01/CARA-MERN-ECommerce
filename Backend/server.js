import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

import mongoose from "mongoose";
import app from "./app.js";


const startServer = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/CARA");
    console.log("Database Connection successful");

    app.listen(5050, () => {
      console.log("Authentication server started on port 5050...");
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();

