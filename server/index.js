import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

//Initialize express app
const app = express();
dotenv.config();

//Middlewares. Initialize bodyParser for properly sending images and requests
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/posts', postRoutes);
app.use('/createPost', postRoutes);
app.use('/user', userRoutes);

app.get('/', async (req, res) => {
    res.send("Hello from Memories!. Server successfully connected to DB");
})

//Setting up the connection string
//const CONNECTION_URL = 'mongodb+srv://jcrdguez64:jcrdguez64123@cluster0.g9avjuw.mongodb.net/test';
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

    mongoose.set('useFindAndModify', false);