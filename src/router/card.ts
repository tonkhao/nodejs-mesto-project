import { Router } from 'express';
import {
  createCard, deleteCardById, dislikeCard, getCards, likeCard,
} from '../controllers/card';
import { validateCardId, validateCreateCard } from '../validators/celebrateValidators';

const cardRouter = Router();

cardRouter.get('/', getCards);

cardRouter.delete('/:cardId', validateCardId, deleteCardById);

cardRouter.post('/', validateCreateCard, createCard);

cardRouter.put('/:cardId/likes', validateCardId, likeCard);

cardRouter.delete('/:cardId/likes', validateCardId, dislikeCard);

export default cardRouter;
