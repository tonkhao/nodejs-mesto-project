import { createCard, deleteCardById, dislikeCard, getCards, likeCard } from '../controllers/card'
import {Router} from 'express'

const cardRouter = Router()

cardRouter.get('/', getCards)

cardRouter.delete('/:cardId', deleteCardById)

cardRouter.post('/', createCard)

cardRouter.put('/:cardId/likes', likeCard)

cardRouter.delete('/:cardId/likes', dislikeCard)

export default cardRouter;