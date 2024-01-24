import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { contactRoute } from "./routes/contactRoute.js";
import { userRoute } from "./routes/userRoute.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT_NO;
const MONGODBURL = process.env.MONGODB_URL;

app.use(express.json());

app.get("/", async (req, res) => {
  return res.status(200).send("Welcome to BFE contact app");
});

app.use("/contacts", contactRoute);
app.use("/users", userRoute);

mongoose
  .connect(MONGODBURL)
  .then(() => {
    console.log("DB connected successfully");
    mongoose.connection.on("disconnected", () => {
      console.log("Database disconnected");
    });
    app.listen(PORT, () => {
      console.log(`Application started on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
