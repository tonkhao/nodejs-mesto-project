import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
// import jwt from 'jsonwebtoken';
import REQUEST_STATUS from '../types/statusCodes';
import Card from '../models/card';
import BadRequestError from '../errors/badRequestError';

export const getCards = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    next();
  }
};

export const deleteCardById = async (req: Request, res: Response, next: NextFunction) => {
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
      next(new BadRequestError('Ошибка id карточки'));
    } else {
      next();
    }
  }
};

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newCard = await Card.create({
      ...req.body,
      owner: '685d1ae1dc07ff4b77d90cb1',
    });
    res.status(REQUEST_STATUS.OK).send(newCard);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      next(new BadRequestError('Ошибка валидации новой карточки'));
    } else {
      next();
    }
  }
};

export const likeCard = async (req: Request | any, res: Response, next: NextFunction) => {
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
      next(new BadRequestError('Невалидный id карточки'));
    } else {
      next();
    }
  }
};

export const dislikeCard = async (req: Request | any, res: Response, next: NextFunction) => {
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
      next(new BadRequestError('Невалидный id карточки'));
    } else {
      next();
    }
  }
};
