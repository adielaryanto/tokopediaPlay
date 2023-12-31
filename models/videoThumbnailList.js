const mongoose = require('mongoose');

const videoThumbnailSchema = mongoose.Schema({
    videoID :{
        required:true,
        type:String
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

module.exports = mongoose.model('Video', videoThumbnailSchema)