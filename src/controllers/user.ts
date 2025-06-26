import User from "../models/user";
import { Request, Response } from "express";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (error) {
    return res.status(500).send("Ошибка")
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
    return res.send(user);
  } catch (error) {
    return res.status(500).send("Ошибка")
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    return res.status(200).send(newUser);
  } catch (error) {
    return res.status(500).send("Ошибка")
  }
};
