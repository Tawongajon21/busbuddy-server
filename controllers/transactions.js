
const Order= require("../models/Orders");



const createTransaction=async(req,res)=>{
const {orderId,customerId,amount,paymentMethod,currency}=req.body;
const user= req.user;
const id= user._id;
try {
  ///  const order=await Order.findOne({customerId:id});

    
} catch (error) {
    throw error
}
}
const getTransactions=async(req,res)=>{

}
const getTransaction=async(req,res)=>{

}

module.exports= {
    createTransaction,getTransactions,getTransaction
}