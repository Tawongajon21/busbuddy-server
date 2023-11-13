const mongoose= require('mongoose');


const TillSchema=mongoose.Schema({
   
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
            },
            model:{
                type:String,
                required:true
            }
            
     


        }
    ],
    tillNo:{
        type:String,
        default:"1234567890"

    },

  

    totalPrice:{
        type:Number,
        required:true
    }
   
   


});

const Till= mongoose.model('till',TillSchema);

module.exports=Till