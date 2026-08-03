import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const authRouter = Router();

// POST /api/auth/register 

authRouter.post("/register" , authController.register);

authRouter.post("/refresh" , authController.refreshToken);

// GET /api/auth/getMe
// authRouter.get("/getMe" , authController.getMe);

authRouter.post("/logout", verifyJWT , authController.userLogout);

authRouter.post("/login", authController.login);

export default authRouter;
