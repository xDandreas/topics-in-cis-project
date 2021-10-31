const mongodb = require('mongodb');
const Orders = require('../models/order')



const create_order = ( req, res) => {

    Orders.create(req.body, function (err, result){
        if (err) return res.status(500).send('There was error creating this order')
        res.status(200).send("new order created sucessfully!");
    })

}

const get_orders =  (req,res,next) => {  
    Orders.find( {}, async function (err, Posts) {
        if (err) return res.status(500).send({message: 'There was a problem getting jobs'});
        res.status(200).send(Posts);
    });
}


const update_orders =  (req,res,next) => {  
    Orders.findByIdAndUpdate(req.body.id, req.body ,function(err, result){

        if(err){
            return res.status(500).send({message: 'There was a problem getting jobs'});
        }
        else{
            res.status(200).send(result)
        }

    })
}

module.exports = {create_order, get_orders, update_orders}