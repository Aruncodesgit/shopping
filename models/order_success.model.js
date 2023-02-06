const mongoose = require('mongoose');  
var orderSuccessSchema = new mongoose.Schema({  
    
    order_id :{
        type: mongoose.Schema.Types.ObjectId,
    },  
    paymentMethod : {
        type: String,
    }, 
    cashCollected : {
        type: Number,
    },  
    cashStatus: {
        type: String,
    },  
    deliveryPersonID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required :true
    },
    date : {
        type: String,
    } 
});
 
mongoose.model('OrderSuccess', orderSuccessSchema); 


 