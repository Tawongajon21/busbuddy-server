const express= require("express");


const isAuth = require("../middlewares/auth");
const { getTransactions, getTransaction, createTransaction } = require("../controllers/transactions");


const transactionRouter= express.Router();

transactionRouter.get("/get-transactions",getTransactions)
transactionRouter.get("/get-transaction/:id",getTransaction)
transactionRouter.post("/create-transaction",isAuth,createTransaction)



module.exports=transactionRouter;