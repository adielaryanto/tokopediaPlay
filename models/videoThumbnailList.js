const mongoose = require('mongoose');

const videoThumbnailSchema = new mongoose.Schema({
    videoID :{
        
        required:true,
        type:mongoose.Schema.Types.ObjectId, ref : 'videoThumbnailList'
    },
    urlImage :{
        required:true,
        type : String
    },
    thumbnail :{
        required:true,
        type : String
    }
})

module.exports = mongoose.model('VideoThumbnailList', videoThumbnailSchema)