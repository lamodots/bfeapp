import express from "express";
import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactController,
  upDateContactByIdController,
} from "../controllers/contactController.js";

export const contactRoute = express.Router();
contactRoute.post("/create", createContactController);
contactRoute.get("/", getContactController);
contactRoute
  .route("/:id")
  .get(getContactByIdController)
  .put(upDateContactByIdController)
  .delete(deleteContactController);
