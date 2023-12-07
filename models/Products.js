const mongoose= require("mongoose");

const ProductSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    buyingPrice:{
        type:Number,
        required:true
    },
    sellingPrice:{
        type:Number,
        required:true
    },
    barcode:{ 
type:String,
required:true
      
    },
   
    quantityBought:{
        type:Number,
        required:true
    },
    quantitySold:{
        type:Number,
        required:true
    },
    quantityRemaining:{
        type:Number,
        required:true
    },
    shelfNumber:{
        type:String,
        required:true
    }

},{
    timestamps:true
})
const Product= mongoose.model("product",ProductSchema);

module.exports=Product
