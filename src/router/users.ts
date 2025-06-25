import { createUser, getUserById, getUsers } from '../controllers/user'
import {Router} from 'express'

const userRouter = Router()

userRouter.get('/', getUsers)

userRouter.get('/:userId', getUserById)

userRouter.post('/', createUser)

export default userRouter;

