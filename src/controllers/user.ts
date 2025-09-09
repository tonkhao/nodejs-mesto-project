import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { Error as MongooseError } from 'mongoose';
import jwt from 'jsonwebtoken';
import REQUEST_STATUS from '../types/statusCodes';
import { JWT_SECRET } from '../config';
import User from '../models/user';
import NotAuthorizedError from '../errors/notAuthorisedError';
import NotFoundError from '../errors/notFoundError';
import BadRequestError from '../errors/badRequestError';

export const getWelcomeMessage = async (
  req: Request | any,
  res: Response,
) => {
  res.send('API CHECK OK');
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      next(new NotAuthorizedError('Ошибка аторизации'));
    } else {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET);
        res.status(REQUEST_STATUS.OK).send({ token });
      } else {
        next(new NotAuthorizedError('Неправильная почта или пароль'));
      }
    }
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
};

export const getUserInfo = async (req: Request | any, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  try {
    const user = await User.findOne({ _id });
    res.send(user);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (user) {
      res.send(user);
    } else {
      throw new NotFoundError('Пользователь не найден');
    }
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      next(new BadRequestError('Ошибка id пользователя'));
    } else {
      next(error);
    }
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name, about, avatar, email, password: hashedPassword,
    });
    res.status(201).send(newUser);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      next(new BadRequestError('Ошибка валидации нового пользователя'));
    } else {
      next(error);
    }
  }
};

export const updateUser = async (
  req: Request | any,
  res: Response,
  next: NextFunction,
) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id },
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    );
    res.send(updatedUser);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      next(new BadRequestError('Ошибка обновления пользователя'));
    } else {
      next(error);
    }
  }
};

export const updateAvatar = async (req: Request | any, res: Response, next: NextFunction) => {
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
      next(new BadRequestError('Ошибка обновления аватара'));
    } else {
      next(error);
    }
  }
};
