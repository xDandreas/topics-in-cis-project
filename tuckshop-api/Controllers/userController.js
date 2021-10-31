const mongodb = require('mongodb');
const mongoose = require('mongoose');
const User = require('../models/user');
//post controller
const users = async(req,res) => {
let users = await User.find({});
    
    res.send(users);


}
const updateUser = (req,res) => {

    console.log(req.body,req.params.id);
    
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
   
        res.status(200).send(user);

        
    });


}

module.exports = {
    users,updateUser
}