const mongoose=require("mongoose");

const CompanyModel=new mongoose.Schema({
name:{
    type:String,
    required:true
},
companyOwner:{
    type:String,
    required:true
},
companyNameEntered:{
    type:Boolean,
    default:false
}

},
{
    timestamps:true
}
)


const Company= mongoose.model("company",CompanyModel);

module.exports=Company;
