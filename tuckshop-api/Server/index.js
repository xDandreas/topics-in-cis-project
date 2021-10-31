const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();


const app = express();
const Port = process.env.PORT || 8000;

//Database
require('./db')();

//middlewear
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const index = require('../Routes/index');
const user = require('../Routes/user');


app.use('/user',user);
app.use('/',index);
// app.use('/resource',resource);


app.listen(Port, ()=> {console.log(`server started on port ${Port}`)})