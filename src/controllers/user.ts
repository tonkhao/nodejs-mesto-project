import { Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import REQUEST_STATUS from '../types/statusCodes';
import User from '../models/user';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find({});
    if (users.length) {
      res.status(REQUEST_STATUS.OK).send(users);
    } else {
      res.status(REQUEST_STATUS.NOT_FOUND).send({ message: 'Пользователи не найдены' });
    }
  } catch (error) {
    res.status(REQUEST_STATUS.SERVER_ERROR).send({ message: 'Ошибка получения пользователей' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (user) {
      res.status(REQUEST_STATUS.OK).send(user);
    } else {
      res
        .status(REQUEST_STATUS.NOT_FOUND)
        .send({ message: 'Пользователь не найден' });
    }
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      res
        .status(REQUEST_STATUS.BAD_REQUEST)
        .send({ message: 'Ошибка id пользователя' });
    } else {
      res
        .status(REQUEST_STATUS.SERVER_ERROR)
        .send({ message: 'Ошибка получения пользователя' });
    }
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).send(newUser);
  } catch (error) {
    res.status(REQUEST_STATUS.SERVER_ERROR).send({ message: 'Ошибка создания пользователя' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { userData } = req.body;
  try {
    const updatedUser = User.findOneAndUpdate({ _id: userId }, userData, {
      new: true,
      returnOriginal: false,
    });
    res.send(updatedUser);
  } catch (error) {
    res.status(REQUEST_STATUS.SERVER_ERROR).send({ message: 'Ошибка обновления пользователя' });
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
    res.status(REQUEST_STATUS.SERVER_ERROR).send({ message: 'Ошибка обновления аватара' });
  }
};
