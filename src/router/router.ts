import {
  Router, Request, Response, NextFunction,
} from 'express';
import userRouter from './users';
import cardRouter from './card';
import { createUser, getWelcomeMessage, login } from '../controllers/user';
import auth from '../middleware/auth';
import { validateCreateUser, validateLogin } from '../validators/celebrateValidators';
import NotFoundError from '../errors/notFoundError';

const router = Router();

router.get('/', getWelcomeMessage);

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// рауты логина
router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);
router.use(auth);

// основные раутеры
router.use('/users', userRouter);
router.use('/cards', cardRouter);

// конечный раутер для 404
router.use((_req: Request, res: Response, next: NextFunction) => {
  try {
    next(new NotFoundError('Такой страницы нет!'));
  } catch (error) {
    next(error);
  }
});

export default router;
