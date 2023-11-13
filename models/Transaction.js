const mongoose= require('mongoose');


const OrderSchema=mongoose.Schema({
    orderId:{
        type:String,
        required:true
    },
    customerId:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    currency:{
        type:String,
        required:true
    }
    


});

const Orders= mongoose.model('order',OrderSchema);

module.exports=Orders