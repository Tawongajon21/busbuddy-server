const mongoose= require('mongoose');


const TicketSchema=mongoose.Schema({
  
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
  busfare:{
        type:String,
        required:true
    },
  nextOfKinContactDetails:{
        type:String,
        required:true
    },
idType:{
        type:String,
        required:true
    },
idNumber:{
        type:String,
        required:true
    },
noOfBags:{
        type:String,
        required:true
    },
    seatNumber:{
        type:String,
        required:true
    }
    ,
    userId:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    departure:{
        type:String,
        required:true
    },
    arrival:{
        type:String,
        required:true
    },
   paymentMethod:{
        type:String,
        required:true
    },
    tripId:{
        type:String,
        required:true
    },
    passengerId:{
        type:String,
        required:true
    },
    qrCode:{
        type:String

    }

 
    


});

const Ticket= mongoose.model('ticket',TicketSchema);

module.exports=Ticket