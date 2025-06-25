import Card from '../models/card'
import {Router, Request, Response} from 'express'

const cardRouter = Router()

cardRouter.get('/users', (req: Request, res: Response) => {
  console.log("GET USERS")
})

cardRouter.get('/users/:userId', (req: Request, res: Response) => {
  console.log("GET 1 USER")
})

cardRouter.post('/users', (req: Request, res: Response) => {
  console.log("CREATE USER")
  const {name, about} = req.body
  Card.create({name, about})
  .then(user => res.send({data: user}))
  .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
})

export default cardRouter;