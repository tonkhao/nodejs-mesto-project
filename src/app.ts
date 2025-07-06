import express from 'express';
import mongoose from 'mongoose';
import { errors as celebrateErrors } from 'celebrate';
import router from './router/router';
import errorHandler from './middleware/errorHandlers';
import { errorLogger, requestLogger } from './middleware/logger';

const { PORT = 3000 } = process.env;

async function connect() {
  const app = express();
  app.use(express.json());

  app.use(requestLogger);

  app.use(router);

  app.use(errorLogger);

  app.use(celebrateErrors());

  app.use(errorHandler);

  await mongoose.connect('mongodb://localhost:27017/mestodb');
  console.log('CONNECTION SUCCESS!');

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

connect();
