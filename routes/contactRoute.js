import express from "express";
import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactController,
  upDateContactByIdController,
} from "../controllers/contactController.js";
import { isLoggedInController } from "../middlewares/auth.js";

export const contactRoute = express.Router();
contactRoute.post("/create", isLoggedInController,  createContactController);
contactRoute.get("/", isLoggedInController,  getContactController);
contactRoute
  .route("/:id")
  .get(getContactByIdController)
  .put(upDateContactByIdController)
  .delete(deleteContactController);
