const Onboarding=require("../models/Onboarding")


const GetOnboarding=async(req,res)=>{


    try {
        const id=req.params.id
        const onboarding=await Onboarding.findById(id);
        if (!onboarding) {
            res.status(200).json([])
        }
        res.status(200).json(onboarding)
    } catch (error) {
        res.status(500).json({msg:"Server error"})
    }
}
const GetOnboardings=async(req,res)=>{


    try {
        
        const onboarding=await Onboarding.find();
        if (!onboarding) {
            res.status(200).json([])
        }
        res.status(200).json(onboarding)
    } catch (error) {
        res.status(500).json({msg:"Server error"})
    }
}


module.exports={GetOnboarding,GetOnboardings}