import express from 'express';
import router from './router/router';
import mongoose from 'mongoose';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mydb');

app.use('/', router);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})