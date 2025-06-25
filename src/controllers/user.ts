import User from "../models/user";
import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
  res.send("ALL USERS");
};

export const getUserById = (req: Request, res: Response) => {
  res.send("SINGLE USER");
};

export const createUser = (req: Request, res: Response) => {
  res.send("CREATE USER");
};
  // User.create({
  //   name: req.body.name,
  //   about: req.body.about,
  //   avatar: req.body.avatar,
  // })
  //   .then((user) => res.send(user))
  //   .catch((err) => res.status(400).send(err));
