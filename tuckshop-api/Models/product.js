const mongoose = require('mongoose');

var ProductsSchema = new mongoose.Schema({

    name : String,
    description : String,
    price : String,
    stock: String,
    type:String,
    product_image: String,
    available:String,
    created_ts: {
        type: Date,
        default: new Date()
    },
    updated_ts: Date
});


const Products = mongoose.model('products', ProductsSchema);

module.exports = Products;
