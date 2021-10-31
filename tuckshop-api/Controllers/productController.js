const mongodb = require('mongodb');

const Product = require('../models/product');


//Create an Product an add it Mongo database
const product_create =  (req,res,next) => {
    Product.create(req.body, function (err, result) {
        if (err) return res.status(500).send('There was an error adding creating Product and adding it to the Database.');
        res.status(200).send('created succesfully');
    });

}


//Update a product that is already in the database 

const Product_Update =  (req,res,next) => {
    Product.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, product) {
        if (err) return res.status(500).send("There was a problem updating the product.");
   
        res.status(200).send(product);

        
    });



}

//get all products in the collection
const get_products =  (req,res,next) => {  
        Product.find( {}, async function (err, Posts) {
            if (err) return res.status(500).send({message: 'There was a problem getting jobs'});
            res.status(200).send(Posts);
        });
    }


module.exports = {product_create , Product_Update, get_products }