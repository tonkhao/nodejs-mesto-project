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
    console.log("req.body")
    console.log(req.body) //возвращает undefined
    const newUser = await User.create(req.body);
    res.status(200).send(newUser);
  } catch (error) {
    console.log(error)
    res.status(500).send({error: "Ошибка создания пользователя"})
  }
};
