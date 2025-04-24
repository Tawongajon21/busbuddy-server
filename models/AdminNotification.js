const mongoose=require("mongoose");

const AdminNotificationModel=new mongoose.Schema({
message:{
    type:String,
    required:true
},
userId:{
    type:String,
    required:true
},
read:{
    type:Boolean,
    default:false
},
tripId:{
    type:String
},

},
{
    timestamps:true
}
)


const AdminNotification= mongoose.model("adminNotification",AdminNotificationModel);

module.exports=AdminNotification;
