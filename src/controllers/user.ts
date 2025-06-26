import User from "../models/user";
import { Request, Response } from "express";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send({message: "Ошибка получения пользователей"})
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("Пользователь не найден");
    }
  } catch (error) {
    res.status(500).send({ message: "Ошибка получения пользователя" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).send(newUser);
  } catch (error) {
    res.status(500).send({message: "Ошибка создания пользователя"})
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { userData } = req.body
  try {
    const updatedUser = User.findOneAndUpdate({ _id: userId }, userData, {
      returnOriginal: false,
    });
    res.send(updatedUser);
  } catch (error) {
    res.status(500).send({message: "Ошибка обновления пользователя"})
  }
};

export const updateAvatar = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { avatarLink } = req.body;
  try {
    const updatedUser = User.findOneAndUpdate({ _id: userId }, avatarLink, {
      returnOriginal: false,
    });
    res.send(updatedUser);
  } catch (error) {
    res.status(500).send({ message: "Ошибка обновления аватара" });
  }
};
