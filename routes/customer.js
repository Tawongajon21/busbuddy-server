

const  express= require('express');
const {  CustomerSignup, CustomerLogin, EditCustomerProfile, GetCustomerProfile } = require('../controllers/auth');

const isAuth = require('../middlewares/auth');
const customerRoutes= express.Router();

customerRoutes.post("/signup",CustomerSignup)
customerRoutes.post("/signin",CustomerLogin);
customerRoutes.use(isAuth)
customerRoutes.put("/update-profile",EditCustomerProfile);
customerRoutes.get("/get-profile",GetCustomerProfile);



module.exports=customerRoutes