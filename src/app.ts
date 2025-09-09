import express from 'express';
import mongoose from 'mongoose';
import { errors as celebrateErrors } from 'celebrate';
import cors from 'cors';
import router from './router/router';
import errorHandler from './middleware/errorHandlers';
import { errorLogger, requestLogger } from './middleware/logger';
import { MONGO_URL, PORT } from './config';

async function connect() {
  const app = express();

  app.use(express.json());

  const corsOptions = {
    origin: 'tonkhao.students.nomorepartiessbs.ru',
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));

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
