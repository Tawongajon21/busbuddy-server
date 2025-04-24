
const  express= require('express');
const { DriverLogin,DriverSignup,getDriver,getDrivers,deleteDriver,getDriverTrips } = require('../controllers/driverAuth');

const isAuth = require('../middlewares/auth');
const driverRoutes= express.Router();

driverRoutes.post("/signup",isAuth,DriverSignup)
driverRoutes.post("/signin",DriverLogin);
driverRoutes.get("/drivers",isAuth,getDrivers);
driverRoutes.get("/driver-trips",isAuth,getDriverTrips);
driverRoutes.get("/driver/:id",isAuth,getDriver);
driverRoutes.patch("/driver/:id",isAuth,getDriver);
driverRoutes.delete("/driver/:id",isAuth,deleteDriver);


/*
adminRoutes.put("/update-profile",isAuth,EditAdminProfile);
adminRoutes.get("/get-profile",isAuth,GetAdminProfile);
*/


module.exports=driverRoutes