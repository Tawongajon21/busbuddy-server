const express=require("express");
const { GetTillOperatorSales, GetSale, UpdateSale, DeleteSale, GetSales, CreateSale } = require("../controllers/Sales");
const isAuth = require("../middlewares/auth");

const salesRouter= express.Router();

salesRouter.use(isAuth)
salesRouter.get("/get-till-operator-sales",GetTillOperatorSales)
salesRouter.post("/create-sale",CreateSale)
salesRouter.get("/get-sales",GetSales)
salesRouter.get("/get-sale/:id",GetSale)
salesRouter.patch("/update-sale/:id",UpdateSale)
salesRouter.delete("/delete-sale/:id",DeleteSale)


module.exports=salesRouter