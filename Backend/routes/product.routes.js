import {Router} from "express";
import * as productController from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.get("/", productController.getProduct);

productRouter.post("/", productController.postProduct);

productRouter.delete("/:id" , productController.deleteProduct);

productRouter.put("/:id", productController.updateProduct);

productRouter.get("/:id", productController.getSingleProduct);


export default productRouter;