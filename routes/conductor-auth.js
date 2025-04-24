

const  express= require('express');
const { ConductorLogin,ConductorSignup,getConductor,getConductors,updateConductor } = require('../controllers/conductorAuth');
const { GetConductorTrips} =require("../controllers/trip")
const isAuth = require('../middlewares/auth');
const conductorRoutes= express.Router();


conductorRoutes.get("/conductors",isAuth,getConductors);
conductorRoutes.get("/conductor/:id",isAuth,getConductor);
conductorRoutes.get("/conductor-trips",isAuth,GetConductorTrips);
conductorRoutes.patch("/conductor/:id",isAuth,updateConductor);
conductorRoutes.post("/conductor-signup",isAuth,ConductorSignup);
conductorRoutes.post("/conductor-signin",ConductorLogin);



module.exports=conductorRoutes