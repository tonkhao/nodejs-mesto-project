import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import router from '../src/router/router'

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

//TODO: какой тип указать если ругается на req.user?
app.use((req: Request | any, res: Response, next: NextFunction) => {
  req.user = {
    _id: "685d1ae1dc07ff4b77d90cb1",
  };

  next();
});

app.use(router);

async function connectDb() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  console.log("CONNECTION SUCCESS!")

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
}

connectDb()