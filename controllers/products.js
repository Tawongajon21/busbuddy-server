const Customer = require("../models/Admin");
const Product= require("../models/Products");

const CreateProduct=async(req,res)=>{
    const {name,brand,model,sellingPrice,buyingPrice,barcode,quantityBought,quantitySold,year,shelfNumber}= req.body;
 
      const product= await Product.findOne({barcode:barcode});
  
      if (product) {
        res.status(200).json({msg:"The product containing the barcode already exists."})
      }else if(!product){
        const newProduct= await Product.create({
            name,
            brand,
            model,
            sellingPrice,
            buyingPrice,
            barcode,
            quantityBought,
            quantitySold,
            quantityRemaining:quantityBought-quantitySold,
            shelfNumber
          
            year
            });
            
    res.status(201).json(newProduct)
      }else{
        res.status(500).json({msg:"cannot create product"})
      }
  


 



}
const UpdateProduct=async(req,res)=>{

try {
    const id = req.params.id;
const product= await Product.findByIdAndUpdate(id,{$set:req.body},{new:true});
if (product) {
    res.status(201).json(product)
} else {
    res.status(201).json({msg:"product not found"})
}

} catch (error) {
    res.status(500).json({msg:"server error"})
}
}
const DeleteProduct=async(req,res)=>{
    try {
        const id= req.params.id;
const product= await Product.findByIdAndDelete(id);
res.status(200).json({msg:"product deleted succesfully"})
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }

}
const GetProduct=async(req,res)=>{
    try {
        const id= req.params.id;
const product= await Product.findById(id);
if (product) {
    res.status(200).json({msg:"product retrieved succesfully",product});

}else{
    res.status(200).json({msg:"product not found"})
}
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }


}
const GetProducts=async(req,res)=>{
try {
  const {name,brand,model,year,barcode}= req.query
  const queryObject= {};
  if (name) {
    queryObject.name={$regex:name,$options:'i'}
  }
  if (brand) {
    queryObject.brand= {$regex:brand,$options:'i'}
  }
  if (model) {
    queryObject.model= {$regex:model,$options:'i'}
  }
  if (year) {
    queryObject.year={$regex:year,$options:'i'}
  }
  if (barcode) {
    queryObject.barcode={$regex:barcode,$options:'i'}
  }

    const products= await Product.find(queryObject);

    if (!products) {
        res.status(200).json({msg:"no products available"})
    }else{
        res.status(200).json(products)
    }
} catch (error) {
    res.status(500).json({msg:"server error"})
}
}




module.exports={
    CreateProduct,UpdateProduct,DeleteProduct,GetProduct,GetProducts
}
