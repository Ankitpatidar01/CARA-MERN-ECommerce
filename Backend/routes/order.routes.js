import { Router } from "express";
import { createOrder, getMyOrders } from "../controllers/order.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const orderRouter = new Router();
orderRouter.post("/", verifyJWT, createOrder);
orderRouter.get("/", verifyJWT, getMyOrders);

export default orderRouter;