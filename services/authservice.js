import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

const JWT_secret = process.env.JWT_SECRET;

export const generateToken = (payload) => {
  const token = jwt.sign(payload, JWT_secret);
  return token;
};
export const verifyToken = (token) => {
  const decodedToken = jwt.sign(token, JWT_secret);
  return decodedToken;
};

export const isValidPassword = async (password, hassedPassword) => {
  const validPassword = await bcrypt.compare(password, hassedPassword);
  return validPassword;
};
