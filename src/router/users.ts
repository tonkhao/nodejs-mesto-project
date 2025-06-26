import user from 'models/user'
import { createUser, getUserById, getUsers, updateAvatar, updateUser } from '../controllers/user'
import {Router} from 'express'

const userRouter = Router()

userRouter.get('/', getUsers)

userRouter.get('/:userId', getUserById)

userRouter.post('/', createUser)

userRouter.patch('/users/me', updateUser)

userRouter.patch('/updateAvatar', updateAvatar)

export default userRouter;

