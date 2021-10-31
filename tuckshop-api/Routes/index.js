const express = require('express');
// require('../helpers/OAuth');
const passport = require('passport');
const router = express.Router();
const ProductsController = require('../Controllers/productController')
const user = require('./user');
const AuthController = require('../Controllers/authenticationController');
const AuthAdminController = require('../Controllers/authenticationAdminController');
const{ ath } = require('../middleware/VerifyToken');
const OrdersController = require('../Controllers/ordersController')


//get posts


//user/login
router.post('/login',AuthController.login);
//register
router.post('/register',AuthController.register);

router.post('/mobile/register',AuthController.mobile_register);

// account activation 
router.post('/activation',AuthController.activate_account);
//reset password
router.put('/password/reset',AuthController.changePassword);
//forget password
router.post('/password/forgot',AuthController.forgetPassword);

router.post('/googlelogin',AuthController.GoogleOAuth_Login);

//create an product 
router.post('/products/register', ProductsController.product_create);

//update a product 
router.put('/products/update/:id', ProductsController.Product_Update)

//get all products 
router.get('/products', ProductsController.get_products);


//get all orders 
router.post('/orders/create', OrdersController.create_order);

//get all orders 
router.get('/orders', OrdersController.get_orders);

//update order status
router.put('/orders/update/:id', OrdersController.update_orders);


//user/login
router.post('/admin/login',AuthAdminController.login);
//register
router.post('/admin/register',AuthAdminController.register_admin);




module.exports = router;








