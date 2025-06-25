import express from 'express';
import mongoose from 'mongoose';
import router from '../src/router/router'
import userRouter from '../src/router/users'
import cardRouter from '../src/router/card'

const { PORT = 3000 } = process.env;

const app = express();

app.use('/', router);
app.use('/user/', userRouter)
app.use('/card/', cardRouter)

async function connectDb() {
  await mongoose.connect('mongodb://localhost:27017/mydb');
  console.log("CONNECTION SUCCESS!")
}

connectDb()


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})