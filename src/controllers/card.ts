import { Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import REQUEST_STATUS from '../types/statusCodes';
import Card from '../models/card';

export const getCards = async (_req: Request, res: Response) => {
  try {
    const cards = await Card.find({});
    if (cards.length) {
      return res.send(cards);
    }
    return res.send([]);
  } catch (error) {
    return res
      .status(REQUEST_STATUS.SERVER_ERROR)
      .send({ error: 'Ошибка получения карточек' });
  }
};

export const deleteCardById = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndDelete(cardId);
    if (card) {
      return res.status(REQUEST_STATUS.OK).send(card);
    }
    return res
      .status(REQUEST_STATUS.NOT_FOUND)
      .send({ error: 'Не найдет удаляемый документ' });
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      return res
        .status(REQUEST_STATUS.BAD_REQUEST)
        .send({ message: 'Ошибка id карточки' });
    }
    return res.status(REQUEST_STATUS.SERVER_ERROR).send({ message: 'Ошибка удаления карточки' });
  }
};

export const createCard = async (req: Request, res: Response) => {
  try {
    const newCard = await Card.create({
      ...req.body,
      owner: '685d1ae1dc07ff4b77d90cb1',
    });
    if (newCard) {
      return res.status(REQUEST_STATUS.OK).send(newCard);
    }
    return res
      .status(REQUEST_STATUS.BAD_REQUEST)
      .send({ message: 'Ошибка создания карточки' });
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      return res
        .status(REQUEST_STATUS.BAD_REQUEST)
        .send({ message: 'Ошибка валидации новой карточки' });
    }
    if (error instanceof Error && error.message.includes('E11000')) {
      return res
        .status(REQUEST_STATUS.BAD_REQUEST)
        .send({ message: 'Карточка с таким именем уже существует' });
    }
    return res.status(REQUEST_STATUS.SERVER_ERROR).send({ message: 'Ошибка сервера' });
  }
};

// TODO тут временная заглушка в виде any
export const likeCard = async (req: Request | any, res: Response) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
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
    if (error instanceof Error && error.message.includes('E11000')) {
      return res
        .status(REQUEST_STATUS.BAD_REQUEST)
        .send({ message: 'Невалидный id карточки' });
    }

    return res
      .status(REQUEST_STATUS.BAD_REQUEST)
      .send({ message: 'Ошибка обновления карточки' });
  }
  return res.status(REQUEST_STATUS.SERVER_ERROR).send({ message: 'Ошибка сервера' });
};

// TODO тут временная заглушка в виде any
export const dislikeCard = async (req: Request | any, res: Response) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
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
    if (error instanceof Error && error.message.includes('E11000')) {
      return res
        .status(REQUEST_STATUS.BAD_REQUEST)
        .send({ message: 'Невалидный id карточки' });
    }
    return res
      .status(REQUEST_STATUS.BAD_REQUEST)
      .send({ message: 'Ошибка обновления карточки' });
  }
  return res.status(REQUEST_STATUS.SERVER_ERROR).send({ message: 'Ошибка сервера' });
};
