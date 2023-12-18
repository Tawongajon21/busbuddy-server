const TillOperator = require("../models/TillOperator");
const { GenerateSalt, GeneratePassword, ValidatePassword, generateSignature } = require("../utils");

const tillOperatorSignUp=async(req,res)=>{

    const {email,phone,password,name,surname}=req.body;
  

     const salt= await GenerateSalt()
    
        const existingTillOperator= await TillOperator.findOne({email});
        const userPassword= await GeneratePassword(password,salt)
      
            if ( existingTillOperator) {
                res.status(401).json({
                    msg:"Email already in use"
                })
            }
            else if(! existingTillOperator){
                const newTillOperator= await TillOperator.create({
                   name,email,password:userPassword,phone,salt,surname
                });
                if (newTillOperator) {
                  const signature=await generateSignature({
                    _id:newTillOperator._id,
                    email:newTillOperator.email,
                    phone:newTillOperator.phone,
                    isAdmin:newTillOperator.isAdmin,
                    surname:newTillOperator.surname,
                    name:newTillOperator.name
        
                  })  
                    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
                  res.status(201).json({
                  
                    _id:newTillOperator._id,
                    email:newTillOperator.email,
                    phone:newTillOperator.phone,
                    isAdmin:newTillOperator.isAdmin,
                    surname:newTillOperator.surname,
                signature:signature
                })
                   
        
                }
        
            }
            else{
        
                res.status(500).json({msg:"server error"})
        
            }
           
                   
        
              
          
}
const tillOperatorSignIn=async(req,res)=>{
    const {email,password}= req.body;
    const existingAdmin=await TillOperator.findOne({email:email});
 try {
     if (!existingAdmin) {
         res.status(401).json({msg:"User does not exist please sign up"})
        } else {
         const response=await ValidatePassword(password,existingAdmin.password,existingAdmin)
         if (response==="wrong details") {
             res.status(401).json({
                 msg:"Wrong email or password"
             })
                 }
                 else{
                     const signature=await generateSignature({
                         _id:existingAdmin._id,
                         email:existingAdmin.email,
                         phone:existingAdmin.phone,
                         isAdmin:existingAdmin.isAdmin,
                     })
                     res.status(201).json({
                      
                    
                         signature:signature,
                         _id:existingAdmin._id,
                         email:existingAdmin.email,
                         phone:existingAdmin.phone,
                         isAdmin:existingAdmin.isAdmin,
                     })
                 }
        }
 } catch (error) {
     res.status(500).json({msg:"Server error"})
 }
  
  
}

module.exports={
    tillOperatorSignIn,tillOperatorSignUp
}
