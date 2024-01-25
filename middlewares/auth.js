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
    console.log("my details" + " " +  user.email, user.password, user._id);
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

    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = generateToken(payload);

    res.status(200).json({ messsage: "Logged in sucessfully", data: {
      email: user.email,
      id: user._id,
      token: token
    } });
  } catch (error) {
    res.status(500).json({ message: error.messsage });
  }
};

export const isLoggedInController = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(404).json({message: "Authorization headers is required !"});
  }

  const bearerTokken = authHeader.split(" ")[1];
  if (!bearerTokken) {
    return res.status(404).json({message: "Token is required"});
  }
  try {
    const payload = verifyToken(bearerTokken);

    if (!payload) {
      return res.statu(404).json({message:"You need to login to access this route !"});
    }



    req.payload = payload;
    next();
  } catch (error) {
    return res.status(500).json({message:error.message});
  }
};
