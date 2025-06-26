import User from "../models/user";
import { Request, Response } from "express";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send({error: "Ошибка получения пользователей"})
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
    res.send(user);
  } catch (error) {
    res.status(500).send({error: "Ошибка получения пользователя"})
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).send(newUser);
  } catch (error) {
    res.status(500).send({error: "Ошибка создания пользователя"})
  }
};

export const updateUser = async (req: Request, res: Response) => {
  console.log("UPDATE USER")
};

export const updateAvatar = async (req: Request, res: Response) => {
  console.log("UPDATE AVATAR")
};
