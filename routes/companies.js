

const  express= require('express');
const multer=require("multer");
const { getCompanies,getCompany,updateCompany,deleteCompany,createCompany } = require('../controllers/company');
const uploadMiddleware = multer({ dest: 'uploads/' });


const isAuth = require('../middlewares/auth');
const companyRoutes= express.Router();

companyRoutes.post("/add-company",isAuth,createCompany)
companyRoutes.get("/get-companies",isAuth,getCompanies);
companyRoutes.get("/get-company/:id",isAuth,getCompany);
companyRoutes.delete("/delete-company/:id",isAuth,deleteCompany);
/*
adminRoutes.put("/update-profile",isAuth,EditAdminProfile);
adminRoutes.get("/get-profile",isAuth,GetAdminProfile);
*/


module.exports=companyRoutes