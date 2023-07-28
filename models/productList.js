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
        type : mongoose.Schema.Types.ObjectId, ref :'Video'
    }
    
})

module.exports = mongoose.model('ProductList', productListSchema)