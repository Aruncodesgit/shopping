const mongoose = require('mongoose'); 

var addressSchema = new mongoose.Schema({  
    addressName : {
        type:String
    },
    address : {
        type:String
    } ,
    landmark : {
        type:String
    },
    city : {
        type:String
    }, 
    postalcode : {
        type:String
    },
    user_id :{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required :true
    }, 
});
 


mongoose.model('Address', addressSchema); 
 