const express= require("express");

const isAuth = require("../middlewares/auth");
const { AddToTill, GetTill, DeleteTillItem, EmptyTill } = require("../controllers/till");
const tillRouter= express.Router();

tillRouter.post("/add-to-till",isAuth,AddToTill);
tillRouter.get("/get-till",isAuth,GetTill)
tillRouter.delete("/delete-till-item/:id",isAuth,DeleteTillItem);
tillRouter.put("/empty-till/:id",isAuth,EmptyTill);

module.exports=tillRouter;