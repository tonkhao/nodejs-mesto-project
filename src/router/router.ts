import { Router } from 'express';
import userRouter from './users';
import cardRouter from './card';
import { Request, Response } from 'express';

const router = Router();

//Дефолтный раутер для заглушки главной страницы
router.get('/', (req: Request, res: Response) => {
  res.send({message: "Добро пожаловать!"})
})

//основные раутеры
router.use('/users', userRouter);
router.use('/cards', cardRouter);

export default router;
