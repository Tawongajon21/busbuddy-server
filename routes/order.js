const express= require("express");

const isAuth = require("../middlewares/auth");
const {CreateOrder,GetOrders,GetOrder, UpdateOrder} = require("../controllers/orders");


const orderRouter= express.Router();


orderRouter.post("/create-order",isAuth,CreateOrder);
orderRouter.get("/get-orders",isAuth,GetOrders);
orderRouter.get("/get-order/:id",isAuth,GetOrder);
orderRouter.put("/update-order/:id",isAuth,UpdateOrder);



module.exports=orderRouter;