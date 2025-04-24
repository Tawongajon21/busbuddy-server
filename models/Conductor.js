const mongoose= require('mongoose');


const ConductorSchema=mongoose.Schema({
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
        required:true,
    
    },
    salt:{
        type:String,
        required:true
    },
    role:{
        type:String,
       default:"conductor"
    },
    company:{
        type:String,
        required:true
    }
    


});
ConductorSchema.virtual('publicData').get(function (){
    return {
        name:this.name,
        surname:this.surname,
        email:this.email
    }
})

const Conductor= mongoose.model('conductor',ConductorSchema);

module.exports=Conductor