

const  express= require('express');
const {  AdminSignup, AdminLogin, EditAdminProfile, GetAdminProfile } = require('../controllers/auth');

const isAuth = require('../middlewares/auth');
const adminRoutes= express.Router();

adminRoutes.post("/signup",AdminSignup)
adminRoutes.post("/signin",AdminLogin);
adminRoutes.put("/update-profile",isAuth,EditAdminProfile);
adminRoutes.get("/get-profile",isAuth,GetAdminProfile);



module.exports=adminRoutes