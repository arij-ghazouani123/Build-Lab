import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

import ProjectRouter from './routes/project.routes.js';
//import multer from 'multer';
//import path from 'path';


const app = express();
const port = process.env.port || 9090;
const databaseName ='BuildLab';


mongoose.set('debug', true);

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://localhost:27017/${databaseName}`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log(`connected to ${databaseName}`);
} ).catch(er => console.log(er));

app.use(morgan("dev"))  //morgan

app.use(
    cors({
        origin : "http://localhost:3000"
    })
)


app.use(express.json());
app.use(express.urlencoded({encoded : true}));


app.use('/project',ProjectRouter);

app.listen(port, () => {
    console.log(`Server running at http://hostname:${port}/`);
})
