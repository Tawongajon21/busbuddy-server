const Company=require("../models/Company")

const createCompany=async(req,res)=>{
    const {name}=req.body;
    let user=req.user
    let role=user.role
  
    try {


if (user) {

    console.log(role);
    let companyOwner=user._id
    let getCompany=await Company.findOne({name});
    if (getCompany) {
        res.status(200).json({msg:"Company name already taken"})
    }
    
    if (role==="Admin" || "companyOwner") {
        console.log(name);
        console.log(companyOwner);
        let newCompany=await Company.create({name,companyOwner,companyNameEntered:true});
        console.log(newCompany);
        res.status(200).json(newCompany)
    }else{
        res.status(401).json({msg:"User is not an admin"})
    }

  
}else{
    req.status(401).json({msg:"User unauthorized"})
}
        
    } catch (error) {
        res.status(500).json({msg:"Server error"})
    }
}
const getCompanies=async(req,res)=>{
    let user=req.user
    try {
        if (user) {
        let companyOwner=user._id;

        let companies=await Company.find({companyOwner});
        
        res.status(200).json(companies)
        }
    } catch (error) {
        res.status(500).json({msg:"Server error"})
    }
}
const getCompany=async(req,res)=>{
    let user=req.user
    let companyId=req.params.id
    try {
        if (user) {
        
        let company=await Company.findById(companyId);
        res.status(200).json(company)
        }
    } catch (error) {
        res.status(500).json({msg:"Server error"})
    }
}
const updateCompany=async(req,res)=>{
    let companyId=req.params.id
try {
    const updateCompany=await Company.findByIdAndUpdate(companyId,{$set:req.body},{new:true})

    res.status(201).json(updateCompany)
    
} catch (error) {
    res.status(500).json({msg:"Server error"})
}
}
const deleteCompany=async(req,res)=>{
    let companyId=req.params.id
try {
    const updateCompany=await Company.findByIdAndDelete(companyId)

    res.status(201).json({msg:"Company deleted"})
    
} catch (error) {
    res.status(500).json({msg:"Server error"})
}
}

module.exports={createCompany,getCompanies,getCompanies,getCompany,updateCompany,deleteCompany}