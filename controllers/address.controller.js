const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const Address = mongoose.model('Address');

  
module.exports.address = async (req, res, next) => {

    var address = new Address();
    address.addressName = req.body.addressName; 
    address.address = req.body.address;
    address.landmark = req.body.landmark;
    address.city = req.body.city;
    address.postalcode = req.body.postalcode;
    address.user_id = req._id;   
    address.save((err, doc) => {
            if (!err) {
                res.send(doc); 
            } 
            else { 
                 
            } 
        }); 

}



module.exports.addressDetails = async (req, res, next) => {  
    const address = await Address.find({user_id: req._id});
    res.json(address)
 
}

module.exports.addressDelete = (req, res, next) => { 
    if(!ObjectId.isValid (req.params.id)) 
    return res.status(400).send(`No record found with given id: ${req.params.id}`)
    
    Address.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) {res.send('Delted Successfully !'); }
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    })
       
}

 
