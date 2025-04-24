

const  express= require('express');
const { CompanyOwnerLogin,CompanyOwnerSignup } = require('../controllers/companyOwnerAuth');

const isAuth = require('../middlewares/auth');
const companyOwnerRoutes= express.Router();

companyOwnerRoutes.post("/signup",isAuth,CompanyOwnerSignup)
companyOwnerRoutes.post("/signin",CompanyOwnerLogin);

/*
adminRoutes.put("/update-profile",isAuth,EditAdminProfile);
adminRoutes.get("/get-profile",isAuth,GetAdminProfile);
*/


module.exports=companyOwnerRoutes