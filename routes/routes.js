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


module.exports = router;
