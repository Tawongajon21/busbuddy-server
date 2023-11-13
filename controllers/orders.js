const Address = require('../models/Address');
const Cart = require('../models/Cart');
const Order= require('../models/Orders');
//const {Paynow}=require("paynow")
const Product= require("../models/Products")
const getProduct=async(productId,quantity)=>{
    try {
        const product = await Product.findById(productId);
        if (product) {
        product.quantity=product.quantity-quantity;
        await product.save();
        console.log(product);
        return product
        
        }
    } catch (error) {
        return error.message
    }

  
}
const CreateOrder=async(req,res)=>{
    const {deliveryType,paymentMethod,currency,deliveryCost,houseNumber,street,surburb,city,paid}=req.body;
const user= req.user;

const customerId= user._id;
try {

    if (user) {
        const cart= await Cart.find({customerId:customerId});
       
        const orderId=`${Math.floor(Math.random()*89999)+1000}`;
        const address= await Address.findOne({customerId:customerId});

        const cartItems= cart[0];
       

  
    
        let totalCost= cartItems.totalPrice
     
        const temporaryCartItems= cartItems;
        const orderItems= cartItems.products
   
        let   deliveryAddress={houseNumber,street,surburb,city};
        const totalPaid= totalCost+deliveryCost;
    
       

        //const orderItems= cartItems
        const order=await Order.create({
            orderId,
            orderItems,
            customerId,
            orderItems,
            totalCost:totalCost,
            deliveryType,
            deliveryCost,
            paymentMethod,
            currency,
            deliveryAddress,
            totalPaid,
            paid
        });
    /*   
if (paymentMethod==="Ecocash") {
    let paynow=new Paynow("16608", "5c048196-62b1-4e7e-8ed5-717c13d2f6b5");
    let payment = paynow.createPayment(orderId);
    payment.add(`${orderId} for ${totalPaid}`, totalPaid);
    paynow.send(payment).then( (response) => {

        // Check if request was successful
        if(response.success) {
            // Get the link to redirect the user to, then use it as you see fit
            let link = response.redirectUrl;
    
            // Save poll url, maybe (recommended)?
            let pollUrl = response.pollUrl;
        }
    
    });
    
}
**/
        if (paid===true) {
            orderItems.map((item)=>{
                const {productId,quantity}=item;
                console.log(quantity,productId);
                getProduct(productId,quantity);
            })
            
                   
             
              
                    
                   /// await Promise.all(productUpdates);
                  
            
                    
             }

res.status(201).json({msg:"order created successful",order:order})


    } else {
        res.status(401).json({msg:"user not authorized"})
    }
} catch (error) {
    throw error
}
}
const GetOrders=async(req,res)=>{
    const user=req.user;
    const id= user._id;
    try {
        if (user) {
        const orders= await Order.find({customerId:id});
        if (orders) {
            res.status(200).json({msg:"orders recieved succesfully",data:orders});
        }else{
            res.status(200).json({msg:"no orders found"});
        }
        }else{
            res.status(200).json({msg:"User not autheticated"})
        }
    } catch (error) {
       throw error 
    }
  
}
const GetOrder=async(req,res)=>{
    const orderId= req.params.id
    const user=req.user;
    const id= user._id;

  try {
    
    if (user) {
        const order= await Order.findById(orderId);
        if (order){
            res.status(200).json({msg:"order recieved succesfully",data:order})
        }else{
            res.status(200).json({msg:"order has not been found"})
        }
    }
  } catch (error) {
    throw error
  }
}

const UpdateOrder=async(req,res)=>{
  //  const existingCustomer =await Customer.findByIdAndUpdate(user._id,{$set:req.body},{new:true})
   /// res.json(existingCustomer)

    const orderId= req.params.id
    const user=req.user;
    try {
        const order = await Order.findByIdAndUpdate(orderId,{$set:req.body},{new:true});
  
        const getOrder= await Order.findById(orderId);
        const {orderItems,paid}= getOrder;

 if (paid===true) {
orderItems.map((item)=>{
    const {productId,quantity}=item;
  
    getProduct(productId,quantity);
})

       
 
  
        
       /// await Promise.all(productUpdates);
      

        
 }


//updateProduct(orderItems)


       
           
       // console.log(updateProduct);
        res.status(200).send("helo")
    } catch (error) {
        throw error
    }
   

 ///  if (user) {
  
   // console.log(getOrder);
   // const paid= order.paid;
  // if (paid) {
  
   // }
    
//if (order) {
  //  res.status(200).json({msg:"order has been updated succesfully",data:order});
//} else if(!order) {
  //  res.status(200).json({msg:"order is not found"})
//}
  //  else {
    //res.status(200).json({msg:"User not authorized"})
   //} 

 //catch (error) {
   // throw error
//}
}
module.exports= {CreateOrder,GetOrders,GetOrder,UpdateOrder}