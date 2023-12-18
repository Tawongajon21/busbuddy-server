const  express= require('express');

const isAuth = require('../middlewares/auth');
const { ManagerSignup, ManagerSignin, EditManagerProfile, GetManagerProfile, GetAdmins, GetCashiers } = require('../controllers/managerAuth');
const managerRoutes= express.Router();

managerRoutes.post("/signup",ManagerSignup)
managerRoutes.post("/signin",ManagerSignin);
managerRoutes.put("/update-profile",isAuth,EditManagerProfile);
managerRoutes.get("/get-profile",isAuth,GetManagerProfile);
managerRoutes.get("/get-admins",isAuth,GetAdmins);
managerRoutes.get("/get-cashiers",isAuth,GetCashiers);



module.exports=managerRoutes
