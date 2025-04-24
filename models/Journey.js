const mongoose= require('mongoose');

const JourneySchema=mongoose.Schema({
    to:{
        type:String
    },
    from:{
        type:String
    },
    currentLocation:{
        type:String
    },
    averageSpeed:{
        type:String
    },
})