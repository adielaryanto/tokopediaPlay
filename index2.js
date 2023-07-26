require('dotenv').config();

const bodyParser = require('body-parser');
const express = require ('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;


mongoose.connect(mongoString);

const database = mongoose.connection;

database.on('error',(error)=>{
    console.log(error);
})

database.once('connected', ()=>{
    console.log('Database Connected');
})

const routes = require('./routes/routes')
const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended:true,
    }),
);

app.use('/api',routes)

app.listen(3000,()=>{
    console.log('Servernya jalan di ${3000}')
})


