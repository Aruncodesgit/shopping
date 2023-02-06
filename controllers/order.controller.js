const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const Order = mongoose.model('Order');
var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'arun70840@gmail.com',
        pass: 'evwphfaaowaeyxrm',
    }
})
 
module.exports.order = (req, res, next) => {
    var order = new Order();
    order.userName = req.body.userName;
    order.email = req.body.email;
    order.phone = req.body.phone;
    order.receiverName = req.body.receiverName;
    order.receiverPhone = req.body.receiverPhone;  
    order.door_no = req.body.door_no;
    order.cross = req.body.cross;  
    order.landmark = req.body.landmark;
    order.address = req.body.address;  
    order.paymentMethod = req.body.paymentMethod;  
    order.gstTotal = req.body.gstTotal; 
    order.totalPrice = req.body.totalPrice;  
    order.cartOrder = req.body.cartOrder;  
    order.status = req.body.status;    
	order.orderedDate = req.body.orderedDate;
    order.user_id = req._id;   
	var today_date = new Date().toJSON().slice(0, 10);
    var OTP = Math.floor(1000 + Math.random() * 9000); 
    order.orderOTP = OTP
    order.save((err, doc) => {
        if (!err){
            res.send(doc);  
            var mailOptions = {
                from: 'arun70840@gmail.com',
                to: order.email,
                subject: 'E-commerce',
                html: ` 
                <table width="700px" style="font-family: 'Bai Jamjuree', sans-serif;
	font-size: 12px; margin: auto;overflow: hidden;
    position: relative;    border-collapse: collapse;">
		<tr>
			<td align="center" style="background-color:#ff2d2d;height:250px;padding:40px 50px;" valign="middle">

				<h1 style="font-size: 45px;color:#fff;">Order Confirmed !</h1>
			</td>
		</tr> 
		<tr>
			<td   style="width:50%;padding:10px" valign="middle">
				<p style="font-weight:bold; margin-bottom:0px">Dear `+ order.userName +`,</p>

				<p style="margin-bottom:15px">Your order has been confirmed ! , Please check with below details.</p>
			</td> 
		</tr>  
		<tr>
			<td valign="middle" style="padding:10px">
				<p style="margin-bottom: 0;"><b>Order:</b>  #`+ order._id +`</p>
				<p style="margin-bottom: 0;"><b>Date:</b> `+ today_date +`</p>
				<p style="margin-bottom: 0;"><b>Payment Method:</b> `+ order.paymentMethod +`</p>
		   </td> 
		</tr>
		<tr>
			<td style="padding:10px">
				<table style="text-align: left; width: 100%;border-collapse: collapse;">
					<thead>
						<tr>
							<th style="border:1px solid #ccc;padding: 4px 10px;">Sl.No</th>
							<th style="border:1px solid #ccc;padding: 4px 10px;">Product</th>
							<th style="border:1px solid #ccc;padding: 4px 10px;">Qty</th>
							<th style="border:1px solid #ccc;padding: 4px 10px;">Price</th>
							<th style="border:1px solid #ccc;padding: 4px 10px;">Sub Total</th>
						</tr>
					</thead>
					<tbody>
						<tr> 
							<td style="border:1px solid #ccc;padding:4px 10px;">` + 1 +`</td>
							<td style="border:1px solid #ccc;padding: 4px 10px;">`+ order.cartOrder[0].name +`</td>
							<td style="border:1px solid #ccc;padding: 4px 10px;">`+ order.cartOrder[0].qty +`</td>
							<td style="border:1px solid #ccc;padding: 4px 10px;">`+ order.cartOrder[0].price +`</td>
							<td style="border:1px solid #ccc;padding: 4px 10px;">`+ order.cartOrder[0].subTotal +`</td>
						</tr> 
					</tbody>
					<tbody>
						<tr>
							<td colspan="5" style="padding:30px 0px;">
								<table  style="width: 100%;border-collapse: collapse;">
									<tr>
										<td style="border-bottom: 2px dashed #ccc;"></td>
									</tr>
								</table>
							</td>
						</tr>
					</tbody>
					<tbody> 
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td style="border:1px solid #ccc;padding: 8px;"><b>GST 5%</b></td>
							<td style="border:1px solid #ccc;padding: 8px;">`+ order.gstTotal +`</td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td style="border:1px solid #ccc;padding: 8px;"><b>Grant Total</b></td>
							<td style="border:1px solid #ccc;padding: 8px;">`+ order.totalPrice +`</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
		<tr>
			<td style="padding:30px 10px;">
				<table  style="width: 100%;border-collapse: collapse;">
					<tr>
						<td style="border-bottom: 2px dashed #ccc;"></td>
					</tr>
				</table>
			</td>
		</tr>  
		<tr>
			<td padding:10px" valign="middle">
				<p style="font-weight:bold; margin-bottom:0px">To ,</p>

				<p style="margin-bottom:0px">` + order.userName + `</p>
				<p style="margin:0px">` + order.landmark + `</p>
				<p style="margin:0px">` + order.address + `</p>
				<p style="margin:0px">` + order.phone + `</p> 
			</td> 
		</tr>  
		<tr>
			<td padding:40px 10px" valign="middle"> 

				<p style="margin-bottom:0px">Share the otp to the delivery person - <b>` + order.orderOTP + `</b></p> 
			</td> 
		</tr> 
		<tr>
			<td style="padding:20px 0px;"></td>
		</tr>
		<tr>
			<td align="center" style="color:#fff;background-color:#ff2d2d;height:0px;padding:10px;" valign="middle">
				All rights reserved
			</td>
		</tr>
	</table>
            `,
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error)
                    console.log(error);
                //else
                //console.log('Email Sent:' + info.response);
            }) 
        }
        else { 
            if (err.code == 11000)
                res.status(422).send(['Already Product Is Added']);
                
            else
                return next(err); 
        }
        
    });
}


 

module.exports.orderDetails = async (req, res, next) => {  
    const order = await Order.find({user_id: req._id});
    res.json(order)
 
}

// get by Id 
module.exports.orderDetailsGetById = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record found with given id: ${req.params.id}`)

    Order.findById(req.params.id, (err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error' + Json.stringfy(err, undefined, 2)); }
    });
}



module.exports.orderDetailsAdmin = async (req, res, next) => {  
    Order.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error' + Json.stringfy(err, undefined, 2)); }
    });
}

module.exports.updateOrder = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(` No record found with given id : ${req.params.id}`);

    var order = {
        status:req.body.status,
        deliverPerson:req.body.deliverPerson,
        deliveryPersonNumber:req.body.deliveryPersonNumber,
		deliveryPersonID : req.body.deliveryPersonID
    }; 
   
    Order.findByIdAndUpdate(req.params.id, { $set: order }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc);  }
        else { console.log('Error in order update:' + JSON.stringfy(err, undefined, 2)); }
    });
}

module.exports.orderDetailsDelivery = async (req, res, next) => {  
    const orders = await Order.find({deliveryPersonID: req._id});
    res.json(orders)
}


module.exports.updateOrderDelivery = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(` No record found with given id : ${req.params.id}`);

    var order = {
        status:req.body.status,
        cashCollected:req.body.cashCollected,
        customerOTP:req.body.customerOTP 
    }; 

    Order.findByIdAndUpdate(req.params.id, { $set: order }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in order update:' + JSON.stringfy(err, undefined, 2)); }
    });
}


// //delete holiday
// module.exports.wishDelete = (req, res, next) => { 
//     if(!ObjectId.isValid (req.params.id)) 
//     return res.status(400).send(`No record found with given id: ${req.params.id}`)
    
//     Wish.findByIdAndRemove(req.params.id, (err, docs) => {
//         if(!err) {res.send('Delted Successfully !');}
//         else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
//     })
       
// }

 
 