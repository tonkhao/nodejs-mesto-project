import { Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import REQUEST_STATUS from '../types/statusCodes';
import User from '../models/user';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(REQUEST_STATUS.SERVER_ERROR).send({ message: 'Ошибка сервера' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (user) {
      res.send(user);
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
        .send({ message: 'Ошибка сервера' });
    }
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, about, avatar } = req.body;
    const newUser = await User.create({ name, about, avatar });
    res.status(201).send(newUser);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      res
        .status(REQUEST_STATUS.BAD_REQUEST)
        .send({ message: 'Ошибка валидации нового пользователя' });
    } else {
      res
        .status(REQUEST_STATUS.SERVER_ERROR)
        .send({ message: 'Ошибка сервера' });
    }
  }
};

export const updateUser = async (req: Request | any, res: Response) => {
  const { _id } = req.user;
  const { name, about, avatar } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id },
      { name, about, avatar },
      {
        new: true,
        runValidators: true,
      },
    );
    res.send(updatedUser);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      res
        .status(REQUEST_STATUS.BAD_REQUEST)
        .send({ message: 'Ошибка обновления пользователя' });
    } else {
      res
        .status(REQUEST_STATUS.SERVER_ERROR)
        .send({ message: 'Ошибка сервера' });
    }
  }
};

export const updateAvatar = async (req: Request | any, res: Response) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id },
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );
    res.send(updatedUser);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      res
        .status(REQUEST_STATUS.BAD_REQUEST)
        .send({ message: 'Ошибка обновления аватара' });
    } else {
      res
        .status(REQUEST_STATUS.SERVER_ERROR)
        .send({ message: 'Ошибка сервера' });
    }
  }
};
