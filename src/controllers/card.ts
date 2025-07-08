import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import REQUEST_STATUS from '../types/statusCodes';
import Card from '../models/card';
import BadRequestError from '../errors/badRequestError';
import NotFoundError from '../errors/notFoundError';
import NotAuthorizedError from '../errors/notAuthorisedError';

export const getCards = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    next(error);
  }
};

export const deleteCardById = async (
  req: Request | any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    if (card) {
      // здесь извлекаю id из ObjectId
      const isCardOwner = (card?.owner as any).toHexString() === req.user._id;
      // проверяю владельца
      if (isCardOwner) {
        const deletedCard = await Card.findByIdAndDelete(cardId);
        // финально проверяю что карточка удалена
        if (!deletedCard) {
          next(new NotFoundError('Неизвестная ошибка удаления карточки'));
        } else {
          res.status(REQUEST_STATUS.OK).send(card);
        }
      } else {
        next(new NotAuthorizedError('Нет прав для удалений такой карточки'));
      }
    } else {
      next(new NotFoundError('Не найден удаляемый документ'));
    }
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      next(new BadRequestError('Ошибка id карточки'));
    } else {
      next(error);
    }
  }
};

export const createCard = async (req: Request | any, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  try {
    const newCard = await Card.create({
      name,
      link,
      owner: req.user._id,
    });
    res.status(REQUEST_STATUS.OK).send(newCard);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      next(new BadRequestError('Ошибка валидации новой карточки'));
    } else {
      next(error);
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
      next(new NotFoundError('Карточка не найдена'));
    }
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      next(new BadRequestError('Невалидный id карточки'));
    } else {
      next(error);
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
      next(new NotFoundError('Карточка не найдена'));
    }
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      next(new BadRequestError('Невалидный id карточки'));
    } else {
      next(error);
    }
  }
};
