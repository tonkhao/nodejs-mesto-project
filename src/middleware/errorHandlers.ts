import { ErrorRequestHandler } from 'express';
import REQUEST_STATUS from '../types/statusCodes';

const errorHandler: ErrorRequestHandler = (err, _req, res) => {
  const statusCode = err.statusCode || REQUEST_STATUS.SERVER_ERROR;
  const message = statusCode !== REQUEST_STATUS.SERVER_ERROR ? err.message : 'Ошибка сервера';
  res.status(statusCode).send({ message, status: statusCode });
};

export default errorHandler;
