const express = require('express');
const router = express.Router()

// Connection ke model yang dibutuhkan
const Movie = require('../models/movie');
const ProductList = require ('../models/productList');
const CommentList = require ('../models/commentList');
const VideoThumbnailList= require ('../models/videoThumbnailList');

// Post Movies
router.post('/postMovies', (req,res)=>{
    const movie = new Movie({
        title : req.body.title,
        year:req.body.year
    })

    try{
        const movieToSave = movie.save();
        res.status(200).json(movieToSave)
    }catch(error){
        res.status(400).json({message:error.message})
    }
})

// Get all movies
router.get('/getAllMovies',async(req,res)=>{
    try{
        const movies = await Movie.find();
        res.json(movies)
    }catch(error){
        res.status(500).json({message:error.message})
    }
});

// Get video thumbnails
app.get('/videoThumbnails', async(req, res)=>{
    try {
        const videoThumbnails = await videoThumbnails.find({});
        res.json(videoThumbnails);
    }catch{
        res.status(500).json({message:'Gagal mencari Video Thumbnails', error : err});
    }
})

// submit video
app.post('/videoThumbnails', async(req, res)=>{
    try{
        const newVideoThumbnail = new videoThumbnails(req.body);
        await newVideoThumbnai.save();
        res.json({message : 'Berhasil menambahkan video Thumbnail baru'});

    }catch{
        rest.status(400).json({message: 'gagal menambahkan video Thumbnail', error:err});
    }
});

// update video thumbnail
module.exports = router;
