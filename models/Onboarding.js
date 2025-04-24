const mongoose=require("mongoose");

const OnboardingModel=new mongoose.Schema({

ownerId:{
    type:String,
    required:true
},
onboarded:{
    type:Boolean,
    default:false
}

},
{
    timestamps:true
}
)


const Onboarding= mongoose.model("onboarding",OnboardingModel);

module.exports=Onboarding;
