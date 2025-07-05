import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import router from './router/router';

const { PORT = 3000 } = process.env;

async function connect() {
  const app = express();
  app.use(express.json());

  app.use((req: Request | any, res: Response, next: NextFunction) => {
    req.user = {
      _id: '686966f2660308a9926b8d11',
    };
    next();
  });

  app.use(router);

  await mongoose.connect('mongodb://localhost:27017/mestodb');
  console.log('CONNECTION SUCCESS!');

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

connect();
