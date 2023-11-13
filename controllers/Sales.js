const Product = require("../models/Products");
const Sale = require("../models/Sales");
const Till = require("../models/TillPoint");

const GetSales=async(req,res)=>{
    try {
        const user= req.user;
        const id= user._id;
        if (user) {
            const sales= await Sale.find();
        
    res.status(200).json(sales)
  
     
  
        }
    } catch (error) {
        throw error
     res.status(500).json({msg:"server error"})
    }
 
}


const CreateSale=async(req,res)=>{
const {currency,paymentMethod}=req.body
    try {

        const product= await Product.find()
        const user= req.user;
      
        const tillOperatorName=`${user.name} ${user.surname}`;
        const id= user._id;
        if (user) {

            let till=await Till.findOne({tillNo:"1234567890"});
            console.log(till)
            const {products,tillNo,totalPrice}=till;
          for (let i = 0; i < products.length; i++) {
            const element = products[i];
            
            const {productId,quantity}= element;
        
            let findMatch=await  Product.findOne({_id:productId});
           
            findMatch.quantitySold= +quantity;
            findMatch.quantityRemaining=findMatch.quantityBought-quantity;

            await findMatch.save();
            console.log(findMatch);
          
          }
          const newSale= await Sale.create({
    products,
    currency,
    paymentMethod,
    tillOperator:id,
    tillOperatorName,
    totalPrice
})
till.products=[];
till.totalPrice=0;
         
await till.save()

            res.status(200).json(newSale)
        } else {
           res.status(401).json({msg:"user not authorized"}) 
        }
    } catch (error) {
    //console.log(error)
      res.status(500).send(error)
        //throw error
    }
}

const GetTillOperatorSales=async(req,res)=>{
    try {
        const user= req.user;
        const id= user._id;
        if (user) {
            const sales= await Sale.find({tillOperator:id});
          

    res.status(200).json(sales)
  
     
  
        }
    } catch (error) {
     res.status(500).json({msg:"server error"})
    }
}

const GetSale=async(req,res)=>{
    try {
        const id= req.params.id;
const sale= await Sale.findById(id);
if (sale) {
    res.status(200).json(sale);

}else{
    res.status(200).json({msg:"product not found"})
}
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }

}

const UpdateSale=async(req,res)=>{

    try {
        const id = req.params.id;
    const sale= await Sale.findByIdAndUpdate(id,{$set:req.body},{new:true});
    if (sale) {
        res.status(201).json(sale)
    } else {
        res.status(201).json({msg:"product not found"})
    }
    
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }
    }
    const DeleteSale=async(req,res)=>{
        try {
            const id= req.params.id;
    const sale= await Sale.findByIdAndDelete(id);
    res.status(200).json({msg:"sale deleted succesfully"})
        } catch (error) {
            res.status(500).json({msg:"server error"})
        }
    
    }

    module.exports={
        GetSale,GetSales,GetTillOperatorSales,UpdateSale,DeleteSale,CreateSale
    }
