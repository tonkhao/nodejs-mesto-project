import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import NotAuthorizedError from '../errors/notAuthorisedError';
import { JWT_SECRET } from '../config';

export default (req: Request | any, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new NotAuthorizedError('Ошибка авторизации'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded !== 'object' || decoded === null) {
      throw new NotAuthorizedError('Неверный токен');
    }
    payload = { _id: decoded._id, iat: decoded.italics, exp: decoded.exp };
  } catch (error) {
    return next(new NotAuthorizedError('Необходима авторизация'));
  }

  req.user = { _id: payload?._id };
  return next();
};
