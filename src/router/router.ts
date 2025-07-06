import { Router, Request, Response } from 'express';
import userRouter from './users';
import cardRouter from './card';
import { createUser, login } from '../controllers/user';
import auth from '../middleware/auth';

const router = Router();

// Дефолтный раутер для заглушки главной страницы
router.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Добро пожаловать!' });
});

router.use(auth);

// основные раутеры
router.use('/users', userRouter);
router.use('/cards', cardRouter);

// рауты логина
router.post('/signin', login);
router.post('/signup', createUser);

// конечный раутер для 404
router.use((_req: Request, res: Response) => {
  res.status(404).send('Такой страницы нет!');
});

export default router;
