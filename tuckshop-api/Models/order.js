const mongoose = require('mongoose');

var OrdersSchema = new mongoose.Schema({

  
    // productID  : {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'products'
    // },
    // userID  : {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'users'
    // },
    
    email: String, 
    firstname: String,
    lastname: String,
    items: Object,
    quantity : String,
    total  : String,
    status: String, 
    created_ts: {
        type: Date,
        default: new Date()
    },
    updated_ts: Date
});


const Orders = mongoose.model('orders', OrdersSchema);

module.exports = Orders;