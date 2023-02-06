const mongoose = require('mongoose');  
var orderSchema = new mongoose.Schema({  
    
    userName: {
        type: String, 
    },  
    email : {
        type: String,
    }, 
    phone: {
        type: String,
    }, 
    receiverName: {
        type: String,
    },  
    receiverPhone : {
        type: String,
    }, 
    door_no: {
        type: String,
    },  
    cross : {
        type: String,
    }, 
    landmark: {
        type: String,
    },  
    address : {
        type: String,
    }, 
    paymentMethod : {
        type: String,
    }, 
    gstTotal : {
        type: String,
    },
    totalPrice: {
        type: Number,
    },  
    cartOrder : [
        {
            prodID:String,
            name:String,
            price:String,
            qty:String,
            subTotal:String,
        }
    ],
    user_id :{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required :true
    },
    orderOTP : {
        type: Number,
    }, 
    status : {
        type: String, 
    },
    deliverPerson: {
        type: String, 
    },
    deliveryPersonNumber: {
        type: String,
    }, 
    deliveryPersonID : {
        type: mongoose.Schema.Types.ObjectId,
    },
    cashCollected : {
        type: Number,
    },
    customerOTP: {
        type: Number,
    }, 
    orderedDate : {
        type: String,
    } 
});
 
mongoose.model('Order', orderSchema);
//module.exports =  mongoose.model('Wish', wishSchema); 


 