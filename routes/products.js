const express= require("express");
const { GetProducts, GetProduct, CreateProduct, DeleteProduct, UpdateProduct, AddToCart, GetCart } = require("../controllers/products");
const isAuth = require("../middlewares/auth");



const productRouter= express.Router();

productRouter.get("/get-products",GetProducts)
productRouter.get("/get-product/:id",GetProduct)
productRouter.use(isAuth)
productRouter.post("/create-product",CreateProduct)
productRouter.put("/update-product/:id",UpdateProduct)
productRouter.delete("/delete-product/:id",DeleteProduct)


module.exports= productRouter;
