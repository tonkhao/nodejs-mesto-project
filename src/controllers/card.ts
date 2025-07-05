import { Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import REQUEST_STATUS from '../types/statusCodes';
import Card from '../models/card';
import jwt from 'jsonwebtoken';

export const getCards = async (_req: Request, res: Response) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    res.status(REQUEST_STATUS.SERVER_ERROR).send({ message: 'Ошибка сервера' });
  }
};

export const deleteCardById = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndDelete(cardId);
    if (card) {
      res.status(REQUEST_STATUS.OK).send(card);
    } else {
      res
        .status(REQUEST_STATUS.NOT_FOUND)
        .send({ error: 'Не найдет удаляемый документ' });
    }
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      res
        .status(REQUEST_STATUS.BAD_REQUEST)
        .send({ message: 'Ошибка id карточки' });
    } else {
      res
        .status(REQUEST_STATUS.SERVER_ERROR)
        .send({ message: 'Ошибка сервера' });
    }
  }
};

export const createCard = async (req: Request, res: Response) => {
  try {
    const newCard = await Card.create({
      ...req.body,
      owner: '685d1ae1dc07ff4b77d90cb1',
    });
    res.status(REQUEST_STATUS.OK).send(newCard);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      res
        .status(REQUEST_STATUS.BAD_REQUEST)
        .send({ message: 'Ошибка валидации новой карточки' });
    } else {
      res
        .status(REQUEST_STATUS.SERVER_ERROR)
        .send({ message: 'Ошибка сервера' });
    }
  }
};

export const likeCard = async (req: Request | any, res: Response) => {
  const { _id } = req.user;
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: _id } },
      { new: true, runValidators: true },
    );
    if (updatedCard) {
      res.status(REQUEST_STATUS.OK).send(updatedCard);
    } else {
      res
        .status(REQUEST_STATUS.NOT_FOUND)
        .send({ message: 'Карточка не найдена' });
    }
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      res
        .status(REQUEST_STATUS.BAD_REQUEST)
        .send({ message: 'Невалидный id карточки' });
    } else {
      res
        .status(REQUEST_STATUS.SERVER_ERROR)
        .send({ message: 'Ошибка сервера' });
    }
  }
};

export const dislikeCard = async (req: Request | any, res: Response) => {
  const { _id } = req.user;
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: _id } },
      { new: true, runValidators: true },
    );
    if (updatedCard) {
      res.status(REQUEST_STATUS.OK).send(updatedCard);
    } else {
      res
        .status(REQUEST_STATUS.NOT_FOUND)
        .send({ message: 'Карточка не найдена' });
    }
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      res
        .status(REQUEST_STATUS.BAD_REQUEST)
        .send({ message: 'Невалидный id карточки' });
    } else {
      res
        .status(REQUEST_STATUS.SERVER_ERROR)
        .send({ message: 'Ошибка сервера' });
    }
  }
};
