const express= require("express");
const {  AddToCart, GetCart, DeleteCartItem, EmptyCart } = require("../controllers/cart");
const isAuth = require("../middlewares/auth");
const cartRouter= express.Router();

cartRouter.post("/add-to-cart",isAuth,AddToCart);
cartRouter.get("/get-cart",isAuth,GetCart)
cartRouter.delete("/delete-cart-item/:id",isAuth,DeleteCartItem);
cartRouter.put("/empty-cart/:id",isAuth,EmptyCart);

module.exports=cartRouter;