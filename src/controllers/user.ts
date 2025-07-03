import { Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import REQUEST_STATUS from '../types/statusCodes';
import User from '../models/user';

// export const login = async (req: Request, res: Response) => {
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       throw new Error('Неправильные почта или пароль');
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       res
//         .status(REQUEST_STATUS.NOT_AUTHORISED)
//         .send({ message: error.message });
//     }
//   }
// };

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
    } else if (error instanceof Error) {
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
    } else if (error instanceof Error) {
      res
        .status(REQUEST_STATUS.SERVER_ERROR)
        .send({ message: 'Ошибка сервера' });
    }
  }
};

export const updateUser = async (req: Request | any, res: Response) => {
  const { _id } = req.body;
  const { userData } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate({ _id }, userData, {
      new: true,
      runValidators: true,
    });
    res.send(updatedUser);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      res
        .status(REQUEST_STATUS.BAD_REQUEST)
        .send({ message: 'Ошибка обновления пользователя' });
    } else if (error instanceof Error) {
      res
        .status(REQUEST_STATUS.SERVER_ERROR)
        .send({ message: 'Ошибка сервера' });
    }
  }
};

export const updateAvatar = async (req: Request, res: Response) => {
  const { _id } = req.body;
  const { avatarLink } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate({ _id }, avatarLink, {
      new: true,
      runValidators: true,
    });
    res.send(updatedUser);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      res
        .status(REQUEST_STATUS.BAD_REQUEST)
        .send({ message: 'Ошибка обновления аватара' });
    } else if (error instanceof Error) {
      res
        .status(REQUEST_STATUS.SERVER_ERROR)
        .send({ message: 'Ошибка сервера' });
    }
  }
};
