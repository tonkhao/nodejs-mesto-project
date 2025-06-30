import { Router } from 'express';
import {
  createCard, deleteCardById, dislikeCard, getCards, likeCard,
} from '../controllers/card';

const cardRouter = Router();

cardRouter.get('/', getCards);

cardRouter.delete('/:cardId', deleteCardById);

cardRouter.post('/', createCard);

cardRouter.put('/:cardId/likes', likeCard);

cardRouter.delete('/:cardId/likes', dislikeCard);

export default cardRouter;
