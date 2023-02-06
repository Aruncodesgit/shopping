const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const Delivery = mongoose.model('Delivery');

  
module.exports.delivery = async (req, res, next) => {

    var delivery = new Delivery(); 
    delivery.name = req.body.name; 
    delivery.phone = req.body.phone; 
    delivery.address = req.body.address; 
    delivery.city = req.body.city;
    delivery.postalcode = req.body.postalcode; 
    delivery.save((err, doc) => {
            if (!err) {
                res.send(doc); 
            } 
            else { 
                 
            } 
        }); 

}



module.exports.deliveryDetails = async (req, res, next) => {  
    Delivery.find((err, docs) => {
        if(!err) {res.send(docs);}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    }); 
 
}

 

 
