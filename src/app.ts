import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import router from "../src/router/router";

const { PORT = 3000 } = process.env;

async function connect() {
  const app = express();
  app.use(express.json());


  //TODO тут временная заглушка в виде any!
  app.use((req: Request | any, res: Response, next: NextFunction) => {
    req.user = {
      _id: "68666d7b7f6d14b8e3bb3b96",
    };

    next();
  });

  app.use(router);

  await mongoose.connect("mongodb://localhost:27017/mestodb");
  console.log("CONNECTION SUCCESS!");

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

connect();
