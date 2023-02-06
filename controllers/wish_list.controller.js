const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const Wish = mongoose.model('Wish');

 
module.exports.wish = (req, res, next) => {
    var wish = new Wish();
    wish.prodID = req.body.prodID;
    wish.image = req.body.image;
    wish.name = req.body.name;
    wish.price = req.body.price;  
    wish.type = req.body.type;   
    wish.prodIDUID = req.body.prodID + req._id;   
    wish.user_id = req._id;   
    wish.save((err, doc) => {
        if (!err){
            res.send(doc); 
        }
        else { 
            if (err.code == 11000)
                res.status(422).send(['Already Product Is Added']);
                
            else
                return next(err); 
        }
        
    });
}


module.exports.wishDetails = async (req, res, next) => {  
    const wish = await Wish.find({user_id: req._id});
    res.json(wish)
 
}


//delete holiday
module.exports.wishDelete = (req, res, next) => { 
    if(!ObjectId.isValid (req.params.id)) 
    return res.status(400).send(`No record found with given id: ${req.params.id}`)
    
    Wish.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) {res.send('Delted Successfully !');}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    })
       
}

 