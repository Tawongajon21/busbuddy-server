const Notifications=require("../models/Notifications");

const createNotification=async(req,res)=>{
const user=req.user;
const {message}=req.body;
console.log("hello");
try {
    if (user) {
        console.log(user);
        let userId=user._id;
        
let newNotification=await Notifications.create({message,userId});


req.app.get('io').emit('new-booking',newNotification)
res.status(200).json(newNotification)

        
    }else{
        res.status(401).json({msg:"User not authorized"})
    }
} catch (error) {
    console.log(error);
    res.status(500).json({msg:"Server error"})
}
}
const readNotification=async(req,res)=>{
const user=req.user;
try {
    const id=req.params.id;
    if (user) {
        const notification=await Notifications.findById(id);
        if (!notification) {
            res.status(404).json({msg:"Item not found"})
        }else{
            notification.read=true;
            await notification.save();
            res.status(200).json({msg:"Notification marked as read notification "})
        }
    }else{
        res.status(401).json({msg:"User not authorized"})
    }
} catch (error) {
    res.status(500).json({msg:"Server error"})
}
}
const getNotifications=async(req,res)=>{
const user=req.user;
try {
    const userId=req.params.id;
    if (user) {
        const notifications=await Notifications.find().sort({createdAt:-1});
        if (!notifications) {
            res.status(404).json({msg:"Item not found"})
        }else{
        
            res.status(200).json(notifications)
        }
    }else{
        res.status(401).json({msg:"User not authorized"})
    }
} catch (error) {
    console.log(error);
    res.status(500).json({msg:"Server error"})
}
}


module.exports={createNotification,readNotification,getNotifications}