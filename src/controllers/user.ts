import { Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import REQUEST_STATUS from '../types/statusCodes';
import User from '../models/user';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find({});
    if (users.length) {
      return res.send(users);
    }
    return res.status(REQUEST_STATUS.NOT_FOUND).send([]);
  } catch (error) {
    return res.status(REQUEST_STATUS.SERVER_ERROR).send({ message: 'Ошибка сервера' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (user) {
      return res.status(REQUEST_STATUS.OK).send(user);
    }
    return res
      .status(REQUEST_STATUS.NOT_FOUND)
      .send({ message: 'Пользователь не найден' });
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      return res
        .status(REQUEST_STATUS.BAD_REQUEST)
        .send({ message: 'Ошибка id пользователя' });
    }
    return res
      .status(REQUEST_STATUS.SERVER_ERROR)
      .send({ message: 'Ошибка получения пользователя' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    return res.status(201).send(newUser);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      return res
        .status(REQUEST_STATUS.BAD_REQUEST)
        .send({ message: 'Ошибка валидации нового пользователя' });
    }
    if (error instanceof Error && error.message.includes('E11000')) {
      return res
        .status(REQUEST_STATUS.BAD_REQUEST)
        .send({ message: 'Пользователь с таким именем уже существует' });
    }
    return res.status(REQUEST_STATUS.SERVER_ERROR).send({ message: 'Ошибка сервера' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { userData } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, userData, {
      new: true,
      runValidators: true,
    });
    return res.send(updatedUser);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      return res
        .status(REQUEST_STATUS.BAD_REQUEST)
        .send({ message: 'Ошибка обновления пользователя' });
    }
    return res.status(REQUEST_STATUS.SERVER_ERROR).send({ message: 'Ошибка сервера' });
  }
};

export const updateAvatar = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { avatarLink } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, avatarLink, {
      new: true,
      runValidators: true,
    });
    return res.send(updatedUser);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      return res
        .status(REQUEST_STATUS.BAD_REQUEST)
        .send({ message: 'Ошибка обновления аватара' });
    }
    return res.status(REQUEST_STATUS.SERVER_ERROR).send({ message: 'Ошибка сервера' });
  }
};
