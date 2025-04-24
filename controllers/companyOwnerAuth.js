const {GeneratePassword, ValidatePassword, generateSignature,GenerateSalt}= require("../utils/index");

const CompanyOwner=require("../models/CompanyOwner")
const Onboarding=require("../models/Onboarding")

const CompanyOwnerSignup=async(req,res)=>{

  
    const {email,phone,password,name,surname}=req.body;
    const user=req.user;

    let role=user.role
console.log(user);
    try {
        if (user) {
            const salt= await GenerateSalt()

            const existingCompanyOwner= await CompanyOwner.findOne({email});
            const userPassword= await GeneratePassword(password,salt)
            if (existingCompanyOwner) {
                res.status(401).json({
                    msg:"Email already in use"
                })
            }
            else if(!existingCompanyOwner){
                const newCompanyOwner= await CompanyOwner.create({
                   name,surname,email,password:userPassword,phone,salt
                });
                console.log(user);
                if (newCompanyOwner&&role==="Developer") {
                  const signature=await generateSignature({
                    _id:newCompanyOwner._id,
                    email:newCompanyOwner.email,
                    phone:newCompanyOwner.phone,
                    role:newCompanyOwner.role,
                    firstLogin:newCompanyOwner.firstLogin

             
        
                  })  
let newOnboarding=await Onboarding.create({
    ownerId:newCompanyOwner._id
})
                  res.status(201).json({
                 signature,email:newCompanyOwner.email,phone:newCompanyOwner.phone,surname:newCompanyOwner.surname,name:newCompanyOwner.name,role:newCompanyOwner.role,firstLogin:newCompanyOwner.firstLogin})
                   
        
                }else{
            res.status(401).json({msg:"Role does not match"})
                }
        
            }
            
        }
    
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"server error"})
    }


    
      

    

}
const CompanyOwnerLogin=async(req,res)=>{
   const {email,password}= req.body;
   const existingCompanyOwner=await CompanyOwner.findOne({email:email});
try {
    if (!existingCompanyOwner) {
        res.status(401).json({msg:"User does not exist please sign up"})
       } else {
        const response=await ValidatePassword(password,existingCompanyOwner.password,existingCompanyOwner)
        if (response==="wrong details") {
            res.status(401).json({
                msg:"Wrong email or password"
            })
                }
                else{
                    const signature=await generateSignature({
                        _id:existingCompanyOwner._id,
                        email:existingCompanyOwner.email,
                        phone:existingCompanyOwner.phone,
                        isAdmin:existingCompanyOwner.isAdmin,
                        firstLogin:existingCompanyOwner.firstLogin,
                        role:existingCompanyOwner.role
                    })
                    existingCompanyOwner.firstLogin=false;
                    await existingCompanyOwner.save();
                    res.status(201).json({
                     
                   
                        signature:signature,
                        _id:existingCompanyOwner._id,
                        email:existingCompanyOwner.email,
                        phone:existingCompanyOwner.phone,
                        name:existingCompanyOwner.name,
                        surname:existingCompanyOwner.surname,
                        role:existingCompanyOwner.role,
                        firstLogin:existingCompanyOwner.firstLogin
                    })
                }
       }
} catch (error) {
 
    res.status(500).json({msg:"Server error"})
}

   
  
}

module.exports={CompanyOwnerSignup,CompanyOwnerLogin}