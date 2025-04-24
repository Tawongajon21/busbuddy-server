const mongoose= require('mongoose');


const PassengerSchema=new mongoose.Schema({
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
        type:String
    },
    from:{
        type:String,
        required:true
    },
   to:{
        type:String,
        required:true
    },
    bus:{
        type:String,
     
        required:true
    },
    busfare:{
        type:String,
     
        required:true
    },
    seatNumber:{
        type:String,
        required:true

    },
    nextOfKinContactDetails:{
        type:String,
        required:true

    },
    tripId:{
        type:String,
        required:true
    },
    idNumber:{
        type:String,
        required:true
    },
    idType:{
        type:String,
        required:true
    },
    noOfBags:{
        type:String,
        required:true
    },
    paid:{
        type:Boolean
    },
    paymentMethod:{
        type:String
    }


    


});

const Passenger= mongoose.model('passenger',PassengerSchema);

module.exports=Passenger