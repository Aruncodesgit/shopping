const mongoose = require('mongoose'); 

var wishSchema = new mongoose.Schema({  
    
    prodID: {
        type: String 
    },  
    image : {
        type: String,
    }, 
    name: {
        type: String,
    },  
    price : {
        type: Number,
    },
    type : {
        type: String,
    },
    date : {
        type: Date,
        default: Date.now()
    },
    prodIDUID :{
        type: String, 
        required :true,
        unique: true
    },
    user_id :{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required :true
    },
});
 
mongoose.model('Wish', wishSchema);
//module.exports =  mongoose.model('Wish', wishSchema); 
 