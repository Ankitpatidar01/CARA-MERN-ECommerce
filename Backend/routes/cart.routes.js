import express from "express";
import {verifyJWT} from "../middleware/verifyJWT.js"

import { getCart , postCart , deleteFromCart , putCart , clearCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", verifyJWT, getCart);

router.post("/", verifyJWT, postCart);

router.delete("/clear", verifyJWT, clearCart);

router.delete("/:id", verifyJWT, deleteFromCart);

router.put("/:id", verifyJWT, putCart);



export default router;