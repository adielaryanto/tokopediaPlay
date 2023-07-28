require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const bodyParser = require('body-parser');

mongoose.connect(mongoString);

const database = mongoose.connection;

database.on('error', (error)=>{
    console.log(error);
})

database.once('connected', ()=>{
    console.log('Database Connected');
})

const routes = require('./routes/routes.js');
const app = express();

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended:true,
    }),
);

app.use('/',routes)

app.listen(3000,()=>{
    console.log(`Server Started at ${3000}`)
})

