import {Router, Request, Response} from 'express'

const router = Router()

router.post('/user', (req: Request, res: Response) => {
  console.log("POST")
})

export default router