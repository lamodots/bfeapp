import express from "express";
import {
  createUserController,
  getAllUserController,
  getUserByIdController,
} from "../controllers/userController.js";
import { loginUserController } from "../middlewares/auth.js";

export const userRoute = express.Router();

userRoute.post("/create", createUserController);
userRoute.get("/", getAllUserController);
userRoute.get("/user/:id", getUserByIdController);
userRoute.post("/login", loginUserController);
// userRoute.get("/logout", logoutUserController);
// userRoute.get("/me", getUserDataController);
