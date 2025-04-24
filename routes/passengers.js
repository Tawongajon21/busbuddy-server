

const  express= require('express');
const multer=require("multer");
const { GetPassengers,GetPassenger,UpdatePassenger,DeletePassenger} = require('../controllers/trip');

const uploadMiddleware = multer({ dest: 'uploads/' });


const isAuth = require('../middlewares/auth');
const passengerRoutes= express.Router();


passengerRoutes.get("/get-passengers/:id",isAuth,GetPassengers);
passengerRoutes.get("/get-passenger/:id",isAuth,GetPassenger);
passengerRoutes.delete("/delete-passenger/:id",isAuth,DeletePassenger);
passengerRoutes.patch("/update-passenger/:id",isAuth,UpdatePassenger);


/*
adminRoutes.put("/update-profile",isAuth,EditAdminProfile);
adminRoutes.get("/get-profile",isAuth,GetAdminProfile);
*/


module.exports=passengerRoutes