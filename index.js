const dotenv = require('dotenv').config();
dotenv.config();

const bodyParser = require('body-parser');
const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');

const mongoString = process.env.DATABASE_URL;
const http = require('http');


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
const port = process.env.port || 5000;

// Connect ke MongoDB
mongoose.connect(process.env.MONGODB_URL)
.then(()=> console.log('MongoDB Connected'))
.catch((err) => console.log(err));
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended:true,
    }),
);

// Skema tiap attribut
const videoThumbnailSchema = mongoose.Schema({
    videoId : String,
    urlImage :String,
    thumbnail :String

})
const productListSchema = mongoose.Schema({
    productId : String,
    linkProduct : String,
    title :String,
    price : Number

})
const commentListSchema = mongoose.Schema({
    username : String,
    comment : String,
    timestamp :Date

})

// Buat connection API
app.use('/api',routes)

app.listen(3000,()=>{
    console.log('Servernya jalan di ${3000}')
})

// panggil setiap model
const VideoThumbnailList = mongoose.model('VideoThumbnailList', videoThumbnailSchema);


