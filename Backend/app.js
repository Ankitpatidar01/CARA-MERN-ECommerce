import express from 'express';
import morgan from 'morgan';
import cors from 'cors'; // Added CORS import
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import cartRoutes from './routes/cart.routes.js'
import productRoutes from './routes/product.routes.js';
import paymentRoutes from './routes/payment.routes.js'
import orderRoutes from "./routes/order.routes.js";

const app = express();

// 1. Enable CORS configuration (Must be at the top)
app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
  credentials: true // Crucial for accepting the httpOnly refresh token cookie
}));

// 2. Standard Request Utilities
app.use(express.json({limit: "10kb"})); // this limit protects against very large request bodies.
app.use(morgan('dev')); 
app.use(cookieParser());

app.use("/api/auth", authRouter); 
app.use("/carts" , cartRoutes);
app.use("/products" , productRoutes)
app.use("/payment" , paymentRoutes)
app.use("/orders", orderRoutes);

export default app;