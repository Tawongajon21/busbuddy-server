

const  express= require('express');
const multer=require("multer");
const { GetBus,GetBuses,CreateBus,DeleteBus } = require('../controllers/bus');
const uploadMiddleware = multer({ dest: 'uploads/' });


const isAuth = require('../middlewares/auth');
const busRoutes= express.Router();

busRoutes.post("/add-bus",isAuth,uploadMiddleware.any('images'),CreateBus)
busRoutes.get("/get-buses",GetBuses);
busRoutes.get("/get-bus/:id",GetBus);
busRoutes.delete("/delete-bus/:id",DeleteBus);
/*
adminRoutes.put("/update-profile",isAuth,EditAdminProfile);
adminRoutes.get("/get-profile",isAuth,GetAdminProfile);
*/


module.exports=busRoutes