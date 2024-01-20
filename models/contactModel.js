import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      unique: true,
    },
    middlename: String,
    surname: String,
    company: String,
    phoneNo: { type: Number, required: true, unique: true },
    published: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
);

export const ContactModel = mongoose.model("Contact", contactSchema);
