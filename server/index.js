import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js'

//Initialize express app
const app = express();

//Middlewares. Initialize bodyParser for properly sending images and requests
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use('/post', postRoutes);
app.use('/createPost', postRoutes);


app.get('/', async (req, res) => {
    res.send("Hello from Memories!. Server successfully connected to DB");
})

//Setting up the connection string
const CONNECTION_URL = 'mongodb+srv://jcrdguez64:jcrdguez64123@cluster0.g9avjuw.mongodb.net/';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

    mongoose.set('useFindAndModify', false);