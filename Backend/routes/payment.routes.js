import {Router} from "express";
import { createOrder } from "../controllers/payment.controller.js"
import {verifyPayment} from "../controllers/verifyPayment.controller.js"

const paymentRouter = Router();

paymentRouter.post("/" , createOrder);

paymentRouter.post("/verify" , verifyPayment);

export default paymentRouter;