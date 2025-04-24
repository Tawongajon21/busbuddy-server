const mongoose=require("mongoose");

const NotificationModel=new mongoose.Schema({
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
}
},
{
    timestamps:true
}
)


const Notification= mongoose.model("notification",NotificationModel);

module.exports=Notification;
