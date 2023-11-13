const  express= require('express');

const isAuth = require('../middlewares/auth');
const { tillOperatorSignUp, tillOperatorSignIn } = require('../controllers/tilloperator');
const { GetTillOperatorSales } = require('../controllers/Sales');


const tillOperatorRoute= express.Router();

tillOperatorRoute.post("/signup",isAuth,tillOperatorSignUp)
tillOperatorRoute.post("/signin",tillOperatorSignIn);
tillOperatorRoute.get("/till-operator-sales",isAuth,GetTillOperatorSales);

module.exports=tillOperatorRoute