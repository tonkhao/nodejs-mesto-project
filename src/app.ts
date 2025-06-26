import express from 'express';
import mongoose from 'mongoose';
import router from '../src/router/router'

const { PORT = 3000 } = process.env;

const app = express();

app.use(router);

async function connectDb() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  console.log("CONNECTION SUCCESS!")

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
}

connectDb()