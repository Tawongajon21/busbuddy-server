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
    orderItems:[
        {
            productId:{
                type:String,
                required:true

            },
            name:{
                type:String,
                required:true

            },
             price:{
                type:Number,
                required:true

            },
            quantity:{
                type:Number,
                required:true
            }
            
     


        }
    ],
    totalCost:{
        type:Number,
        required:true
    },
    deliveryType:{
        type:String,
        required:true,
        value:['Express delivery','Ordinary']

    },
    deliveryCost:{
        type:Number,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true,
        value:['Swipe Nostro','Ecocash','Swipe ZWL','Telecash','Onemoney','Cash on Delivery']
    },
    currency:{
        type:String,
        required:true,
        value:['USD','RAND','ZWL','GBP']
    },
    totalPaid:{
        type:Number,
        required:true
    },
    deliveryAddress:{
            houseNumber:{type:String,required:true},
            street:{type:String,required:true},
            surburb:{type:String,required:true},
          
            city: {type:String,required:true},
        
    },
    paid:{
        type:Boolean,
        default:false
    }


});

const Order= mongoose.model('order',OrderSchema);

module.exports=Order