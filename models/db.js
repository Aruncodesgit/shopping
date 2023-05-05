const mongoose = require('mongoose');


mongoose.set('useFindAndModify', false );
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_URI, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

require('./user.model');  
require('./wish_list.model');  
require('./order.model');
require('./order_success.model');   
require('./address.model'); 
require('./delivery_person.model'); 