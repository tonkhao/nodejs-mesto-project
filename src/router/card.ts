import { createCard, deleteCardById, getCards } from '../controllers/card'
import {Router} from 'express'

const cardRouter = Router()

cardRouter.get('/', getCards)

cardRouter.delete('/:cardId', deleteCardById)

cardRouter.post('/', createCard)

// PATCH /users/me — обновляет профиль
// PATCH /users/me/avatar — обновляет аватар
// PUT /cards/:cardId/likes — поставить лайк карточке
// DELETE /cards/:cardId/likes — убрать лайк с карточки

export default cardRouter;