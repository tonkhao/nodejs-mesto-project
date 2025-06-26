import Card from "../models/card";
import { Request, Response } from "express";

export const getCards = async (_req: Request, res: Response) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    res.status(500).send({error: "Ошибка получения карточек"})
  }
};

export const deleteCardById = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    const card = await Card.deleteOne({_id: cardId})
    res.send(card);
  } catch (error) {
    res.status(500).send({error: "Ошибка получения карточки"})
  }
};

export const createCard = async (req: Request, res: Response) => {
  try {
    const newCard = await Card.create({...req.body, owner: "685d1ae1dc07ff4b77d90cb1"});
    res.status(200).send(newCard);
  } catch (error) {
    res.status(500).send({error: "Ошибка создания карточки"})
  }
};

export const likeCard = (req: Request, res: Response) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)

export const dislikeCard = (req: Request, res: Response) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
