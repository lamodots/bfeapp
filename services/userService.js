import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const createUserServices = async (body) => {
  return await userModel.create(body);
};

export const emailExistServices = async (email) => {
  const emailExist = await userModel.findOne({ email });
  if (emailExist) {
    return true;
  }
  return false;
};

export const hashPasswordServices = async (password) => {
  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

export const getAllUserSerives = async () => {
  const user = await userModel.find({});
  if (!user) {
    return false;
  }
  return true;
};

export const getUserByEmailService = async (email) => {
  return await userModel.findOne({ email });
};

export const getUserByIdService = async (id) => {
  return await userModel.findById(id);
};
