const mongoose = require('mongoose'); 

var deliverySchema = new mongoose.Schema({  
    name : {
        type:String
    },
    phone : {
        type:String
    } ,
    address : {
        type:String
    },
    city : {
        type:String
    }, 
    postalcode : {
        type:String
    }
});
 


mongoose.model('Delivery', deliverySchema); 
 