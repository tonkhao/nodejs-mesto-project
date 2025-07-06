import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import NotAuthorizedError from '../errors/notAuthorisedError';

export default (req: Request | any, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthorizedError('Ошибка авторизации');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (error) {
    next(error);
  }

  req.user = payload;
  return next();
};
