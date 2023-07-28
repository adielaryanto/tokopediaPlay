const mongoose = require('mongoose');

const productListSchema = new mongoose.Schema({
    productId :{
        required:true,
        type:String
    },
    linkProduct :{
        required:true,
        type : String
    },
    title :{
        required:true,
        type : String
    },
    price :{
        required:true,
        type : Number
    },
    videoID : {
        type : String
    }
    
})

module.exports = mongoose.model('Product', productListSchema)