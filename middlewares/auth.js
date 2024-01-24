import {
  generateToken,
  isValidPassword,
  verifyToken,
} from "../services/authservice.js";
import { getUserByEmailService } from "../services/userService.js";

export const loginUserController = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(404)
      .json({ message: "Username and password are required" });
  }
  try {
    const user = await getUserByEmailService(req.body.email);
    console.log("my details" + user.email, user.password);
    if (!user) {
      return res.status(404).json({ message: "User with email not found!" });
    }
    const validPassword = await isValidPassword(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(404).json({ message: "Password is Incorrect!" });
    }

    // const payload = {
    //   id: user._id,
    //   email: user.email,
    // };

    // const token = generateToken(user._id);

    res.status(200).json({ messsage: "Logged in sucessfully" });
  } catch (error) {
    res.status(500).json({ message: error.messsage });
  }
};

export const isLoggedInController = async (req, res, next) => {
  const authHeader = req.header.authorization;
  if (!authHeader) {
    return next("Authorization header is required !");
  }

  const bearerTokken = authHeader.split(" ")[1];
  if (!bearerTokken) {
    return next("Token is required");
  }
  try {
    const payload = verifyToken(bearerTokken);
    if (!payload) {
      return next("You need to login to access this route !");
    }

    req.payload = payload;
    next();
  } catch (error) {
    next(error.messsage);
  }
};
