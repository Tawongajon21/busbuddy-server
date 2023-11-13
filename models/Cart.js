const mongoose= require('mongoose');


const CartSchema=mongoose.Schema({
   
    products:[
        {
            productId:{
                type:String,
                required:true

            },
            name:{
                type:String,
                required:true

            },
            brand:{
                type:String
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

  
    customerId:{type:String,required:true},
    totalPrice:{
        type:Number,
        required:true
    }
   
   


});

const Cart= mongoose.model('cart',CartSchema);

module.exports=Cart