import express from 'express';
import mongoose from 'mongoose';
import router from './router/router';
import errorHandler from './middleware/errorHandlers';

const { PORT = 3000 } = process.env;

async function connect() {
  const app = express();
  app.use(express.json());

  app.use(router);

  app.use(errorHandler);

  await mongoose.connect('mongodb://localhost:27017/mestodb');
  console.log('CONNECTION SUCCESS!');

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

connect();
