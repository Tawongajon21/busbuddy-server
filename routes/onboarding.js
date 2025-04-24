const  express= require('express');
const isAuth = require('../middlewares/auth');
const {GetOnboarding} =require('../controllers/onboarding')
const onboardingRoutes= express.Router();


onboardingRoutes.get('/get-onboarding/:id',isAuth,GetOnboarding);
onboardingRoutes.get('/get-onboardings',isAuth,GetOnboarding);


/*
adminRoutes.put("/update-profile",isAuth,EditAdminProfile);
adminRoutes.get("/get-profile",isAuth,GetAdminProfile);
*/


module.exports=onboardingRoutes