import { Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import REQUEST_STATUS from '../types/statusCodes';
import User from '../models/user';

export const login = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Неправильные почта или пароль');
    }
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(REQUEST_STATUS.NOT_AUTHORISED)
        .send({ message: error.message });
    }
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find({});
    if (users.length) {
      res.send(users);
    } else {
      res.status(REQUEST_STATUS.NOT_FOUND).send([]);
    }
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
    }
    if (error instanceof Error) {
      res
        .status(REQUEST_STATUS.SERVER_ERROR)
        .send({ message: 'Ошибка сервера' });
    }
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).send(newUser);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      res
        .status(REQUEST_STATUS.BAD_REQUEST)
        .send({ message: 'Ошибка валидации нового пользователя' });
    }
    if (error instanceof Error && error.message.includes('E11000')) {
      res
        .status(REQUEST_STATUS.BAD_REQUEST)
        .send({ message: 'Пользователь с таким именем уже существует' });
    }
    if (error instanceof Error) {
      res
        .status(REQUEST_STATUS.SERVER_ERROR)
        .send({ message: 'Ошибка сервера' });
    }
  }
};

// todo: временная заглушка чтобы не ругался на req.user._id
export const updateUser = async (req: Request | any, res: Response) => {
  const { userData } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      userData,
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
    }
    if (error instanceof Error) {
      res
        .status(REQUEST_STATUS.SERVER_ERROR)
        .send({ message: 'Ошибка сервера' });
    }
  }
};

// todo: временная заглушка чтобы не ругался на req.user._id
export const updateAvatar = async (req: Request | any, res: Response) => {
  const { avatarLink } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      avatarLink,
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
    }
    if (error instanceof Error) {
      res
        .status(REQUEST_STATUS.SERVER_ERROR)
        .send({ message: 'Ошибка сервера' });
    }
  }
};
