const Cart= require("../models/Cart");

const AddToCart=async(req,res)=>{
    const {productId,quantity,name,price,brand,model}= req.body;

    const products=[{productId,quantity,name,price,brand,model}];

    try {
      

        const user= req.user;
        const id= user._id
        if (user) {
            
          
          
            let cart= await Cart.findOne({customerId:id});
            if (cart) {
                let itemIndex= cart.products.findIndex(p=>p.productId==productId);
                if (itemIndex>-1) {
                    
                    
                    let productItem=cart.products[itemIndex];
                    productItem.quantity=quantity;
                    
                    cart.totalPrice=cart.products.reduce((sum,item)=>sum+(item.price*item.quantity),0);
                    cart.products[itemIndex]= productItem;

                  

                }else{
                
                    cart.products.push({productId,quantity,name,price,brand,model});
                   
                    cart.totalPrice=cart.products.reduce((sum,item)=>sum+(item.price*item.quantity),0)
                }
                cart=await cart.save();
                res.status(201).json({msg:"added to cart sucessfully",cart})
            }

            else if(!cart){
             
             
          
                const newCart=await Cart.create({
                    customerId:id,
                    products,
                    totalPrice:cart.products.reduce((sum,item)=>sum+(item.price*item.quantity),0),
                    customerId:id

                })
                return res.status(201).json({msg:"item added to the cart",data:newCart})
            }
            else{
                res.status(200).json({msg:"cart not found"})
            }
  
        
        }else{
            res.status(200).json({msg:"user not registered"})
        }
    } catch (error) {
       // res.status(500).json({msg:"Server Error",error})
        throw error
    }
   
}
const GetCart=async(req,res)=>{
    try {
        const user= req.user;
        const id= user._id;
        if (user) {
            const cart= await Cart.findOne({customerId:id});
           

    res.status(200).json({msg:"data has been recieved succesfully",data:cart})
  
     
  
        }
    } catch (error) {
       throw error
    }
 
}
const DeleteCartItem=async(req,res)=>{
    try {
        const user= req.user;
        const id= user._id;
        const productId= req.params.id;
     
        if (user) {
            const cart= await Cart.findOne({customerId:id});
let {products}= cart;
let temp= [];


const product= products.find((item)=>item.productId===productId);
console.log(product);
if (product) {
    let findIndex= products.findIndex(a=>a.productId===productId);
    if (findIndex !== -1) {
        products.splice(findIndex,1)
    }

  

await cart.save()
           

    res.status(200).json({msg:"item has been deleted from the cart",data:cart})
}
else{
    res.status(200).json({msg:"item has not been found"})
}

  
     
  
        }
    } catch (error) {
        throw error
    }
}
const EmptyCart=async(req,res)=>{
    try {
        const user= req.user;
        const id= user._id;
        
        const cartId= req.params.id;
        if (user) {
            const cart= await Cart.findOne({_id:cartId});
          
cart.products=[];
cart.totalPrice=0;

await cart.save();
console.log(cart);
res.status(200).json({msg:"cart emptied succesfully",data:cart})
  
     
  
        }
    } catch (error) {
        throw error
    }
}

module.exports= {
    AddToCart,
    GetCart,
    EmptyCart,
    DeleteCartItem

}