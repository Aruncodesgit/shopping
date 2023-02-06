const express = require('express');
const router = express.Router();
const multer = require("multer");
const jwtHelper = require('../config/jwtHelper'); 
require('../config/passportConfig');


const ctrlUser = require('../controllers/user.controller'); 
const ctrlProducts = require('../controllers/products.controller'); 

 
const ctrlWish = require('../controllers/wish_list.controller'); 
const ctrlOrder = require('../controllers/order.controller'); 
const ctrlAddress = require('../controllers/address.controller');  

const ctrldelivery = require('../controllers/delivery.controller');  
const ctrlOrderSuccess = require('../controllers/order_success.controller'); 


const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {

        cb(null, `${Date.now()}_${file.originalname}`)
    }

})

const upload = multer({ storage: storage });

// user register and login 
router.post('/register', ctrlUser.register); 
router.get('/registerDetails/:id', ctrlUser.registerGetById);
router.get('/userDetails', ctrlUser.userDetails); 

router.post('/authenticate', ctrlUser.authenticate); 
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.put('/register/:id', ctrlUser.updateRegister);


router.post('/address', jwtHelper.verifyJwtToken,  ctrlAddress.address); 
router.get('/addressDetails',jwtHelper.verifyJwtToken,  ctrlAddress.addressDetails); 
router.delete('/address/:id', ctrlAddress.addressDelete);

router.get('/productDetails', ctrlProducts.productDetails);
router.get('/productDetails/:id', ctrlProducts.productDetailsById);

router.post('/wish', jwtHelper.verifyJwtToken, ctrlWish.wish); 
router.get('/wishDetails',jwtHelper.verifyJwtToken,  ctrlWish.wishDetails); 
router.delete('/wish/:id', ctrlWish.wishDelete);

router.post('/order', jwtHelper.verifyJwtToken, ctrlOrder.order);   
router.get('/orderDetails',jwtHelper.verifyJwtToken,  ctrlOrder.orderDetails);
router.get('/orderDetails/:id', ctrlOrder.orderDetailsGetById);



//admin order_details
router.get('/orderDetailsAdmin',  ctrlOrder.orderDetailsAdmin);
router.put('/order/:id', ctrlOrder.updateOrder);
router.put('/orderDelivery/:id', ctrlOrder.updateOrderDelivery);

router.get('/orderDetailsDelivery', jwtHelper.verifyJwtToken, ctrlOrder.orderDetailsDelivery);


router.post('/ordersuccess', jwtHelper.verifyJwtToken, ctrlOrderSuccess.ordersuccess); 
router.get('/orderSuccessDetails',jwtHelper.verifyJwtToken,  ctrlOrderSuccess.orderSuccessDetails); 


router.post('/delivery', ctrldelivery.delivery);   
router.get('/deliveryDetails', ctrldelivery.deliveryDetails);

module.exports = router;



