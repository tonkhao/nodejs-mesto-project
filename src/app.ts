import express from 'express';
import mongoose from 'mongoose';
import { errors as celebrateErrors } from 'celebrate';
import router from './router/router';
import errorHandler from './middleware/errorHandlers';
import { errorLogger, requestLogger } from './middleware/logger';
import { MONGO_URL, PORT } from './config';

async function connect() {
  const app = express();
  app.use(express.json());

  app.use(requestLogger);

  app.use(router);

  app.use(errorLogger);

  app.use(celebrateErrors());

  app.use(errorHandler);

  await mongoose.connect(MONGO_URL);
  console.log('CONNECTION SUCCESS!');

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

connect();
