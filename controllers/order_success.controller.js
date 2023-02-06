const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const OrderSuccess = mongoose.model('OrderSuccess');
 
 
module.exports.ordersuccess = (req, res, next) => {
    var ordersuccess = new OrderSuccess();
    ordersuccess.order_id = req.body._id;
    ordersuccess.paymentMethod = req.body.paymentMethod;
    ordersuccess.cashCollected = req.body.cashCollected;
    ordersuccess.cashStatus = req.body.cashStatus;
    ordersuccess.deliveryPersonID = req._id;  
    ordersuccess.date = req.body.date;
    ordersuccess.save((err, doc) => {
        if (!err){
            res.send(doc);   
        }
        else {  
            return next(err); 
        }
        
    });
}


 

module.exports.orderSuccessDetails = async (req, res, next) => {  
    const ordersuccess = await OrderSuccess.find({deliveryPersonID: req._id});
    res.json(ordersuccess)
 
}
 