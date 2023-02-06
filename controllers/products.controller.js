const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID; 
var db = mongoose.connection;

module.exports.productDetails = async (req, res, next) => {  
    db.collection("products").find().toArray(function(e, d) {
        if(!e) {res.send(d);}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); } 
    });  
}


module.exports.productDetailsById = async (req, res, next) => {   
    if(!ObjectId.isValid (req.params.id)) 
    return res.status(400).send(`No record found with given id: ${req.params.id}`)
    var id = req.params.id;  
    var o_id = new ObjectId(id);
    const findResult = await db.collection("products").find({_id:o_id}).toArray();
    res.send(findResult);  
}
