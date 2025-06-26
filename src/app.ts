import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import router from "../src/router/router";

const { PORT = 3000 } = process.env;

async function connect() {
  const app = express();
  app.use(express.json());

  app.use((req: Request, res: Response, next: NextFunction) => {
    req.user = {
      _id: "685d1ae1dc07ff4b77d90cb1",
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
