const {GeneratePassword, ValidatePassword, generateSignature,GenerateSalt}= require("../utils/index");

const Driver=require("../models/Driver")
const Trips=require("../models/Trip")


const DriverSignup=async(req,res)=>{

  
    const {email,phone,password,name,surname,company}=req.body;
let user=req.user
let role=user.role
    try {
        if (user) {
            
        }else{
            res.status(401).json({msg:"User not authorized"})
        }
        const salt= await GenerateSalt()

        const existingDriver= await Driver.findOne({email});
        const userPassword= await GeneratePassword(password,salt)
        if (existingDriver) {
            res.status(401).json({
                msg:"Email already in use"
            })
        }
        else if(!existingDriver){
            const newDriver= await Driver.create({
               name,surname,email,password:userPassword,phone,salt,company
            });
            if (newDriver) {
                if (role==='companyOwner' || 'Admin' ) {
                    const signature=await generateSignature({
                        _id:newDriver._id,
                        email:newDriver.email,
                        phone:newDriver.phone,
                        role:newDriver.role
            
                      })  
                      res.status(201).json({
                     signature,email:newDriver.email,phone:newDriver.phone,surname:newDriver.surname,name:newDriver.name,role:newDriver.role,company:newDriver.company})
                       
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
const DriverLogin=async(req,res)=>{
   const {email,password}= req.body;
   const existingDriver=await Driver.findOne({email:email});
try {
    if (!existingDriver) {
        res.status(401).json({msg:"User does not exist please sign up"})
       } else {
        const response=await ValidatePassword(password,existingDriver.password,existingDriver)
        if (response==="wrong details") {
            res.status(401).json({
                msg:"Wrong email or password"
            })
                }
                else{
                    const signature=await generateSignature({
                        _id:existingDriver._id,
                        email:existingDriver.email,
                        phone:existingDriver.phone,
                        isAdmin:existingDriver.isAdmin,
                        role:existingDriver.role
                    })
                    res.status(201).json({
                     
                   
                        signature:signature,
                        _id:existingDriver._id,
                        email:existingDriver.email,
                        phone:existingDriver.phone,
                        name:existingDriver.name,
                        surname:existingDriver.surname,
                        role:existingDriver.role,
                        company:existingDriver.company
                    })
                }
       }
} catch (error) {
   
    res.status(500).json({msg:"Server error"})
}

   
  
}


const getDrivers=async(req,res)=>{
    let user=req.user;
    let userId=user._id;
    let role=user.role;
    let company=user.company
    console.log(user);
    try {
        if (user) {
            if (role==="companyOwner" || "Admin") {


                const drivers=await Driver.find({company}).select("name surname email role phone company");
                res.status(200).json(drivers)
            }else{
                res.status(401).json({msg:"User not authorized"})
            }
         
        } else {
            res.status(401).json({msg:"User not authorized"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"server error"})
    }
}
const getDriver=async(req,res)=>{
    let user=req.user;
    let userId=user._id;
    let role=user.role
  let id=req.params.id
  console.log(user);
    try {
        if (user) {
            if (role==="companyOwner" || "Admin") {

                const driver=await Driver.findById(id).select("name surname email role phone");
                res.status(200).json(driver)
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

const updateDriver=async(req,res)=>{
    let user=req.user;
    let userId=user._id;
    let role=user.role
  let id=req.params.id
    try {
        if (user) {
            if (role==="companyOwner"||"driver") {

                const driver=await Driver.findByIdAndUpdate(id,{$set:req.body},{new:true});
                res.status(200).json(driver)
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

                const driver=await Driver.findByIdAndDelete(id);
                res.status(200).json(driver)
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
const getDriverTrips=async(req,res)=>{
    let user=req.user;
    let driver=user._id;
    let role=user.role;
    let company=user.company
    console.log(user);
    try {
        if (user) {
           


                const trips=await Trips.find({driver});
                res.status(200).json(trips)
          
         
        } else {
            res.status(401).json({msg:"User not authorized"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"server error"})
    }
}

module.exports={DriverLogin,DriverSignup,getDrivers,getDriver,updateDriver,deleteDriver,getDriverTrips}