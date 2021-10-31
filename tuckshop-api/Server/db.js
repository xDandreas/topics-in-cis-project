const mongoose = require('mongoose');

module.exports =()=>{

    console.log(process.env.MONGODB_URI_STRING);
mongoose.connect(process.env.MONGODB_URI_STRING,{

useNewUrlParser:'true',
useFindAndModify:'false',
useUnifiedTopology:'true'

}).then(()=>{
    console.log('Mongodb has been connected');
}).catch(err => 
    console.log(err.message))

};