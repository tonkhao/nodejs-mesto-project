import REQUEST_STATUS from "../types/statusCodes";
import Card from "../models/card";
import { Request, Response } from "express";
import { Error as MongooseError } from "mongoose";

export const getCards = async (_req: Request, res: Response) => {
  try {
    const cards = await Card.find({});
    if (cards.length) {
      res.status(REQUEST_STATUS.OK).send(cards);
    } else {
      res
        .status(REQUEST_STATUS.NOT_FOUND)
        .send({ error: "Карточки не найдены" });
    }
  } catch (error) {
    res
      .status(REQUEST_STATUS.SERVER_ERROR)
      .send({ error: "Ошибка получения карточек" });
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
        .send({ error: "Не найдет удаляемый документ" });
    }
  } catch (error) {
     if (error instanceof MongooseError.CastError) {
          res
            .status(REQUEST_STATUS.BAD_REQUEST)
            .send({ message: "Ошибка id карточки" });
        } else {
          res.status(REQUEST_STATUS.SERVER_ERROR).send({ message: "Ошибка удаления карточки" });
        }
  }
};

export const createCard = async (req: Request, res: Response) => {
  try {
    const newCard = await Card.create({
      ...req.body,
      owner: "685d1ae1dc07ff4b77d90cb1",
    });
    if (newCard) {
      res.status(REQUEST_STATUS.OK).send(newCard);
    } else {
      res
        .status(REQUEST_STATUS.BAD_REQUEST)
        .send({ message: "Ошибка создания карточки" });
    }
  } catch (error) {
    res
      .status(REQUEST_STATUS.SERVER_ERROR)
      .send({ message: "Ошибка создания карточки" });
  }
};

//TODO тут временная заглушка в виде any
export const likeCard = async (req: Request | any, res: Response) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  );
  if (updatedCard) {
    res.status(REQUEST_STATUS.OK).send(updatedCard)
  }
  } catch (error) {
    res
        .status(REQUEST_STATUS.BAD_REQUEST)
        .send({ message: "Ошибка обновления карточки" });
  }
};

//TODO тут временная заглушка в виде any
export const dislikeCard = async (req: Request | any, res: Response) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
    req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
  );
  if (updatedCard) {
    res.status(REQUEST_STATUS.OK).send(updatedCard)
  }
  } catch (error) {
    res
        .status(REQUEST_STATUS.BAD_REQUEST)
        .send({ message: "Ошибка обновления карточки" });
  }
};
