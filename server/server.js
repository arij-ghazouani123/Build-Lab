import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import userRouter from './routes/user.route.js';
import multer from 'multer';
import sharp from 'sharp';
import __dirname from 'path';
import path from 'path';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();

const port = process.env.port || 9090;
const databaseName ='buildLab';

app.use(
    cors({
        origin : '*'
    })
);
mongoose.set('debug', true);

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`).then(() => {
    console.log(`connected to ${databaseName}`);
} ).catch(er => console.log(er));

app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan("dev"))  //morgan

app.use(express.json());

app.use(express.urlencoded({encoded : true}));

app.use('/',userRouter);


app.use('/image', express.static('/public/images'));





app.listen(port, () => {
    console.log(`Server running at http://hostname:${port}/`);

})


