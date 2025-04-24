const mongoose= require('mongoose');


const CompanyOwnerSchema=mongoose.Schema({
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
       default:"companyOwner"
    },
    firstLogin:{
        type:Boolean,
        default:true
    }
    


});

const CompanyOwner= mongoose.model('companyOwner',CompanyOwnerSchema);

module.exports=CompanyOwner