const {GeneratePassword, ValidatePassword, generateSignature,GenerateSalt}= require("../utils/index");

const Conductor=require("../models/Conductor")


const ConductorSignup=async(req,res)=>{

  
    const {email,phone,password,name,surname,company}=req.body;
let user=req.user
let role=user.role
    try {
        if (user) {
            
        }else{
            res.status(401).json({msg:"User not authorized"})
        }
        const salt= await GenerateSalt()

        const existingConductor= await Conductor.findOne({email});
        const userPassword= await GeneratePassword(password,salt)
        if (existingConductor) {
            res.status(401).json({
                msg:"Email already in use"
            })
        }
        else if(!existingConductor){
            const newConductor= await Conductor.create({
               name,surname,email,password:userPassword,phone,salt,company
            });
            if (newConductor) {
                if (role==='companyOwner' || 'Admin' ) {
                    const signature=await generateSignature({
                        _id:newConductor._id,
                        email:newConductor.email,
                        phone:newConductor.phone,
                        role:newConductor.role
            
                      })  
                      res.status(201).json({
                     signature,email:newConductor.email,phone:newConductor.phone,surname:newConductor.surname,name:newConductor.name,role:newConductor.role,company:newConductor.company})
                       
                }

    
            }else{
                res.status(401).json({msg:"User not fit to make such an operation"})
            }
    
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"server error"})
    }


    
      

    

}
const ConductorLogin=async(req,res)=>{
   const {email,password}= req.body;
   const existingConductor=await Conductor.findOne({email:email});
try {
    if (!existingConductor) {
        res.status(401).json({msg:"User does not exist please sign up"})
       } else {
        const response=await ValidatePassword(password,existingConductor.password,existingConductor)
        if (response==="wrong details") {
            res.status(401).json({
                msg:"Wrong email or password"
            })
                }
                else{
                    const signature=await generateSignature({
                        _id:existingConductor._id,
                        email:existingConductor.email,
                        phone:existingConductor.phone,
                        isAdmin:existingConductor.isAdmin,
                        role:existingConductor.role
                    })
                    res.status(201).json({
                     
                   
                        signature:signature,
                        _id:existingConductor._id,
                        email:existingConductor.email,
                        phone:existingConductor.phone,
                        name:existingConductor.name,
                        surname:existingConductor.surname,
                        role:existingConductor.role,
                        company:existingConductor.company,
                    })
                }
       }
} catch (error) {
    console.log(error);
    res.status(500).json({msg:"Server error"})
}

   
  
}
const getConductors=async(req,res)=>{
    let user=req.user;
    let userId=user._id;
    let role=user.role;
    let company=user.company
    console.log(user);
    try {
        if (user) {
            if (role==="companyOwner" || "Admin") {


                const conductors=await Conductor.find({company}).select("name surname email role phone");
                res.status(200).json(conductors)
            }else{
                res.status(401).json({msg:"User not authorized"})
            }
         
        } else {
            res.status(401).json({msg:"User not authorized"})
        }

    } catch (error) {
     
        res.status(500).json({msg:"server error"})
    }
}
const getConductor=async(req,res)=>{
    let user=req.user;
    let userId=user._id;
    let role=user.role
  let id=req.params.id
  console.log(user);
    try {
        if (user) {
            if (role==="companyOwner" || "Admin") {

                const conductor=await Conductor.findById(id).select("name surname email role phone");
                res.status(200).json(conductor)
            }else{
                res.status(401).json({msg:"User not authorized"})
            }
         
        } else {
            res.status(401).json({msg:"User not authorized"})
        }

    } catch (error) {
        res.status(500).json({msg:"server error"})
    }
}

const updateConductor=async(req,res)=>{
    let user=req.user;
    let userId=user._id;
    let role=user.role
  let id=req.params.id
    try {
        if (user) {
            if (role==="companyOwner"||"Admin") {

                const conductor=await Conductor.findByIdAndUpdate(id,{$set:req.body},{new:true});
                res.status(200).json(conductor)
            }else{
                res.status(401).json({msg:"User not authorized"})
            }
         
        } else {
            res.status(401).json({msg:"User not authorized"})
        }

    } catch (error) {
        res.status(500).json({msg:"server error"})
    }
}


const deleteDriver=async(req,res)=>{
    let user=req.user;
    let userId=user._id;
    let role=user.role
  let id=req.params.id
    try {
        if (user) {
            if (role==="companyOwner"||"Admin") {

                const conductor=await Conductor.findByIdAndDelete(id);
                res.status(200).json(conductor)
            }else{
                res.status(401).json({msg:"User not authorized"})
            }
         
        } else {
            res.status(401).json({msg:"User not authorized"})
        }

    } catch (error) {
        res.status(500).json({msg:"server error"})
    }
}



module.exports={ConductorLogin,ConductorSignup,getConductor,getConductors,updateConductor,deleteDriver}