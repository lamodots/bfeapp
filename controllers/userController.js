import { generateToken } from "../services/authservice.js";
import {
  createUserServices,
  getAllUserSerives,
  getUserByIdService,
} from "../services/userService.js";
import { emailExistServices } from "../services/userService.js";
import { hashPasswordServices } from "../services/userService.js";

export const createUserController = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(404).json({ message: "Credentials required" });
    }

    const emailExist = await emailExistServices(req.body.email);
    if (emailExist) {
      return res
        .status(404)
        .json({ message: `User with the ${req.body.email} already exist` });
    }

    const hassPasword = await hashPasswordServices(req.body.password);

    const user = {
      email: req.body.email,
      password: hassPasword,
    };
    const createUser = await createUserServices(user);

    res.status(201).json({
      message: "User Registered sucessfully!",
      createUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUserController = async (req, res) => {
  try {
    const allUsers = await getAllUserSerives();
    if (!allUsers) {
      return res.status(404).json({ message: "Failed to get all users" });
    }
    if (allUsers.length <= 0) {
      return res.status(200).json({ message: "No Users" });
    }
    res.status(200).json({
      message: "Users fetched sucessfully!",
      length: allUsers.length,
      data: allUsers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserByIdController = async (req, res) => {
  console.log(req.params);
  if (!req.params.id) {
    return res.status(400).json({ message: "User ID is requred" });
  }

  try {
    const user = await getUserByIdService(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: `user with user id ${req.params.id} not found` });
    }
    res.status(200).json({ message: "User found!", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
