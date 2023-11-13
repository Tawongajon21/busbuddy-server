const Till= require("../models/TillPoint");


const AddToTill=async(req,res)=>{
    const {productId,quantity,name,price,brand,model}= req.body;
    const products=[{productId,quantity,name,price,brand,model}];

    try {
      

        const user= req.user;
        const id= user._id
        if (user) {
            
       let till= await Till.findOne({tillNo:"1234567890"})
          
      
            if (till) {
                let itemIndex= till.products.findIndex(p=>p.productId==productId);
                if (itemIndex>-1) {
                    
                    
                    let productItem=till.products[itemIndex];
                    productItem.quantity=quantity;
                    
                    till.totalPrice=till.products.reduce((sum,item)=>sum+(item.price*item.quantity),0);
                    till.products[itemIndex]= productItem;

                  

                }else{
                
                    till.products.push({productId,quantity,name,price,brand,model});
                   
                    till.totalPrice=till.products.reduce((sum,item)=>sum+(item.price*item.quantity),0)
                }
                till=await till.save();
                res.status(201).json(till)
            }
            else if(!till){
             
        
          
                const newTill=await Till.create({
                   
                    products,
                    totalPrice:products.reduce((sum,item)=>sum+(item.price*item.quantity),0),
                   

                })
                return res.status(201).json(newTill)
            }
            else{
                res.status(200).json({msg:"till not found"})
            }
  
        
        }else{
            res.status(200).json({msg:"user not registered"})
        }
    } catch (error) {
       res.status(500).json({msg:"Server Error"})
      
    }
   
}
const GetTill=async(req,res)=>{
    try {
       const user= req.user;
       const id= user._id;
       if (user) {
        const till= await Till.find({tillNo:"1234567890"})
        res.status(200).json(till)
       } else{
        res.status(401).json({msg:"user not authorized"})
       }
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }
}

const DeleteTillItem=async(req,res)=>{
    try {
        const user= req.user;
        const id= user._id;
        const productId= req.params.id;
     
        if (user) {
            const till= await Till.findOne({tillNo:"1234567890"});
let {products}= till;
let temp= [];


const product= products.find((item)=>item.productId===productId);

if (product) {
    let findIndex= products.findIndex(a=>a.productId===productId);
    if (findIndex !== -1) {
        products.splice(findIndex,1)
    }

  

await till.save()
          

    res.status(200).json(till)
}
else{
    res.status(200).json({msg:"item has not been found"})
}

  
     
  
        }
    } catch (error) {
        throw error
    }
}
const EmptyTill=async(req,res)=>{
    try {
        const user= req.user;
        const id= user._id;
        
        const tillId= req.params.id;
        if (user) {
            const till= await Till.findOne({_id:tillId});
           
//let {products}= cart;
till.products=[];
till.totalPrice=0;

await till.save();

res.status(200).json(till)
  
     
  
        }
    } catch (error) {
        throw error
    }
}

module.exports= {
    AddToTill,
    GetTill,
    EmptyTill,
    DeleteTillItem

}