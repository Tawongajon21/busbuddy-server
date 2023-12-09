const express= require("express");
const { GetProducts, GetProduct, CreateProduct, DeleteProduct, UpdateProduct, AddToCart, GetCart } = require("../controllers/products");
const isAuth = require("../middlewares/auth");
const multer= require("multer")


const productRouter= express.Router();
const uploadMiddleware = multer({ dest: 'uploads/' });
productRouter.get("/get-products",GetProducts)
productRouter.get("/get-product/:id",GetProduct)
productRouter.use(isAuth)
productRouter.post("/create-product",uploadMiddleware.any(),CreateProduct)
productRouter.put("/update-product/:id",UpdateProduct)
productRouter.delete("/delete-product/:id",DeleteProduct)


module.exports= productRouter;
