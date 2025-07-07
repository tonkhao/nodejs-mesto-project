import {
  Router, Request, Response, NextFunction,
} from 'express';
import userRouter from './users';
import cardRouter from './card';
import { createUser, login } from '../controllers/user';
import auth from '../middleware/auth';
import { validateCreateUser, validateLogin } from '../validators/celebrateValidators';
import NotFoundError from '../errors/notFoundError';

const router = Router();

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
    next();
  }
});

export default router;
