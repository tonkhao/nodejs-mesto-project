import User from '../models/user'
import {Router, Request, Response} from 'express'

const userRouter = Router()

userRouter.get('/users', (req: Request, res: Response) => {
  console.log("GET USERS")
})

userRouter.get('/users/:userId', (req: Request, res: Response) => {
  console.log("GET 1 USER")
})

userRouter.post('/users', (req: Request, res: Response) => {
  console.log("CREATE USER")
  const {name, about} = req.body
  User.create({name, about})
  .then(user => res.send({data: user}))
  .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
})

export default userRouter;

