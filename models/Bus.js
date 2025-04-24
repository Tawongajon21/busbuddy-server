const mongoose=require("mongoose");
const sharp=require("sharp")
const BusModel=new mongoose.Schema({
    busName:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    registrationNumber:{
        type:String,
        required:true
    },
    capacity:{
        type:Number,
        required:true
    },
    images:[
        {
          newPath:String,
           thumbnail:String
        }
    ],
    seats:[
        {
            seatNumber:{
                type:String
            },
            occupied:{
                type:Boolean,
                default:false
            }
        }
      
     
    ]
},
{
    timestamps:true
}
)


const Bus= mongoose.model("bus",BusModel);

module.exports=Bus;
