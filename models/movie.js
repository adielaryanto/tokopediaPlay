const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title :{
        required:true,
        type:String
    },
    year :{
        required:true,
        type : Number
    }
})

module.exports = mongoose.model('Movie', movieSchema)