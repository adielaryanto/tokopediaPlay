const express = require('express');
const router = express.Router();

// Connection ke model yang dibutuhkan
const Product = require ('../models/productList');
const Comment = require ('../models/commentList');
const Video= require ('../models/videoThumbnailList');
const commentList = require('../models/commentList');
const { json } = require('body-parser');

// Get video thumbnails
router.get('/video-thumbnail', async(req, res)=>{
    try {
        const videoThumbnails = await Video.find({});
        res.json(videoThumbnails);
    }catch(err){
        res.status(500).json({message:'Gagal mencari Video Thumbnails', error : err.message});
    }
})


// product list
router.get('/:videoID/product', async(req, res)=>{
    try {
        const {videoID} = req.params;
        console.log(videoID);
        const productList = await Product.find({videoID});
        res.json(productList);
    }catch(err){
        res.status(500).json({message:'Gagal mencari product list', error : err});
    }
})


// Get comment list
router.get('/:videoID/comment', async(req, res)=>{
    try {
        const {videoID} = req.params;
        console.log(videoID);
        const CommentList = await Comment.find({videoID});
        res.json(CommentList);
    }catch(err){
        res.status(500).json({message:'Gagal mencari comment list', error : err.message});
    }
})
router.post('/:videoID/submit-comment', async(req, res)=>{
        const {videoID} = req.params;

        const { username, comment } = req.body;
  
        const newComment = await new Comment({
            username, 
            comment, 
            videoID
            });

    await newComment.save();

    res.json({
        message : 'Komen sukses ditambahkan'
    })
})

module.exports = router;
