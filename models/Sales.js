const mongoose= require('mongoose');


const SaleSchema=mongoose.Schema({
   
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
currency:{
    type:String,
    enum:["ZWL","USD","RANDS","PULA"],
    required:true
},
paymentMethod:{
    type:String,
    required:true,
    enum:["Ecocash","Swipe","Cash"]
}
,
 tillOperatorName:{
    type:String
 } ,
 tillOperator:{
    type:mongoose.Types.ObjectId,
    ref:'tillOperator',
    required:true
 }
 ,
    totalPrice:{
        type:Number,
        required:true
    }
  

   


},
{
    timestamps:true
}
);

const Sale= mongoose.model('sale',SaleSchema);

module.exports=Sale