import User from '../models/user'
import {Router, Request, Response} from 'express'

const userRouter = Router()

userRouter.post('/', (req: Request, res: Response) => {
  console.log("POST")
  const {name, about} = req.body
  User.create({name, about})
  .then(user => res.send({data: user}))
  .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
})

export default userRouter;

