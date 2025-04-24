const mongoose=require("mongoose");

const RouteSchema=mongoose.Schema({
    from:{
        type:String
    },
    to:{
        type:String
    }
})

const Route=mongoose.model("route",RouteSchema);
module.exports=Route;