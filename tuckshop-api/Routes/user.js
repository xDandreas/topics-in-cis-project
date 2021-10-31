const express = require('express');
//  require('../helpers/OAuth');
const passport = require('passport');
const router = express.Router();

const userController = require('../Controllers/userController');
const AuthController = require('../Controllers/authenticationController');
const{ auth } = require('../middleware/VerifyToken');
// const HealthController = require('../Controllers/HealthController');

//get posts

router.get('/',userController.users);
//user/login 
router.put('/:id',userController.updateUser);








module.exports = router;
