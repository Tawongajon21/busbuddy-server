const  express= require('express');

const isAuth = require('../middlewares/auth');
const { ManagerSignup, ManagerSignin, EditManagerProfile, GetManagerProfile } = require('../controllers/managerAuth');
const managerRoutes= express.Router();

managerRoutes.post("/signup",ManagerSignup)
managerRoutes.post("/signin",ManagerSignin);
managerRoutes.put("/update-profile",isAuth,EditManagerProfile);
managerRoutes.get("/get-profile",isAuth,GetManagerProfile);



module.exports=managerRoutes
