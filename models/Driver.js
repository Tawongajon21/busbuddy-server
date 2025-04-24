const mongoose= require('mongoose');


const DriverSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    salt:{
        type:String,
        required:true
    },
    role:{
        type:String,
       default:"driver"
    },
    company:{
        type:mongoose.Types.ObjectId,
        ref:'company'
    }
    


});

const Driver= mongoose.model('driver',DriverSchema);

module.exports=Driver