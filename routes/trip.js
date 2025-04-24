

const  express= require('express');
const multer=require("multer");
const { GetTrip,GetTrips,UpdateTrip,DeleteTrip ,CreateTrip,AddPassenger,GetPassengerTrips,CancelTrip} = require('../controllers/trip');
const uploadMiddleware = multer({ dest: 'uploads/' });


const isAuth = require('../middlewares/auth');
const tripRoutes= express.Router();

tripRoutes.post("/add-trip",isAuth,CreateTrip)
tripRoutes.post("/add-passenger/:id",isAuth,AddPassenger)
tripRoutes.get("/get-trips",GetTrips);
tripRoutes.get("/get-user-trips",isAuth,GetPassengerTrips);
tripRoutes.get("/get-trip/:id",GetTrip);
tripRoutes.patch("/update-trip/:id",isAuth,UpdateTrip);
tripRoutes.delete("/delete-trip/:id",DeleteTrip);
tripRoutes.delete("/cancel-trip/:id",isAuth,CancelTrip);

/*
adminRoutes.put("/update-profile",isAuth,EditAdminProfile);
adminRoutes.get("/get-profile",isAuth,GetAdminProfile);
*/


module.exports=tripRoutes