import {Router} from 'express'
import userRouter from './users'
import cardRouter from './card'

const router = Router()

router.use('/users', userRouter)
router.use('/cards', cardRouter)

export default router