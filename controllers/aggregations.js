
const Orders= require("../models/Orders");

const Sales=require("../models/Sales")


const GetMostOrderedProducts=async(req,res)=>{
    try {
        const orders= await Orders.aggregate([
            {
                "$unwind":{
                    "path":"$orderItems"
                }

            },
            {
                "$group":{
                    "_id":"$orderItems.productId",
                    "name":{
                        "$first":"$orderItems.name"
                    },
                    "totalSold":{
                        "$sum":"$orderItems.quantity"
                    }
                }
            },
            {
                "$sort":{
                    "totalSold":-1
                }
            },


        ])
        res.status(200).json({msg:"most ordered goods",data:orders})
    } catch (error) {
        throw error
    }
}
const GetMostSoldProducts=async(req,res)=>{
    try {
        const sales= await Sales.aggregate([
            {
                "$unwind":{
                    "path":"$products"
                }

            },
            {
                "$group":{
                    "_id":"$products.productId",
                    "name":{
                        "$first":"$products.name"
                    },
                    "totalSold":{
                        "$sum":"$products.quantity"
                    }
                }
            },
            {
                "$sort":{
                    "totalSold":-1
                }
            },


        ])
        res.status(200).json(sales)
    } catch (error) {
        throw error
    }
}
const GetDailySales=async(req,res)=>{
   
try {

  const data= await Sales.aggregate([
    {
        $group:{
            _id:{
                $add:[
                    {
                        $dayOfYear:"$createdAt"
                    },
                    {
                        $multiply:[400,{$year:"$createdAt"}]
                    }
                ]
            },
            totalPrice:{$sum:"$totalPrice"},
            first:{$min:"$createdAt"}
        }
  
    },
    {$addFields:{date:"$first"}},
    {$project:{first:0}},
  ])
res.status(200).json(data)
} catch (error) {
 throw error
}
}
const GetWeeklySales=async(req,res)=>{
  
try {

  const data= await Sales.aggregate([
    {
        $group:{
            _id:{
                $add:[
                    {
                        $week:"$createdAt"
                    },
                    {
                        $multiply:[400,{$year:"$createdAt"}]
                    }
                ]
            },
            totalPrice:{$sum:"$totalPrice"},
            first:{$min:"$createdAt"}
        }
      
    },
    {$addFields:{date:"$first"}},
    {$project:{first:0}},
  ])
res.status(200).json(data)
} catch (error) {
 throw error
}
}
const GetMonthlySales=async(req,res)=>{

try {

  const data= await Sales.aggregate([
    {
        $group:{
            _id:{
                $add:[
                    {
                        $month:"$createdAt"
                    },
                    {
                        $multiply:[400,{$year:"$createdAt"}]
                    }
                ]
            },
            totalPrice:{$sum:"$totalPrice"},
            first:{$min:"$createdAt"}
        }
 
    },
    {$addFields:{date:"$first"}},
    {$project:{first:0}},
  ])
res.status(200).json(data)
} catch (error) {
 throw error
}
}
const GetYearlySales=async(req,res)=>{
  
   
try {
 const startDate=new Date()
  const data= await Sales.aggregate([
    {
        $group:{
            _id:{
                $add:[
                    {
                        $year:"$createdAt"
                    },
                    {
                        $multiply:[400,{$year:"$createdAt"}]
                    }
                ]
            },
            totalPrice:{$sum:"$totalPrice"},
            first:{$min:"$createdAt"}
        }
      
    },
    {$addFields:{date:"$first"}},
    {$project:{first:0}},
  ])
res.status(200).json(data)
} catch (error) {
 throw error
}
}
const CumulativeSales=async(req,res)=>{
    try {
        const data= await Sales.aggregate([
            {
                $setWindowFields:{
                    partitionBy:{
                        $year: "$createdAt"
                    },
                    sortBy:{
                        createdAt:1
                    },
                    output:{
                        cumulativeQuantityForYear:{
                            $sum:"$totalPrice",
                            window:{
                                documents:["unbounded","current"]
                            }
                        },
                        maximuQuantityForYear:{
                            $max:"$totalPrice",
                            window:{
                                documents:["unbounded","unbounded"]
                            }
                        }
                    }
                }
            }
        ])
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }
  
}

module.exports={CumulativeSales,GetDailySales,GetMostOrderedProducts,GetMostSoldProducts,GetWeeklySales,GetMonthlySales,GetYearlySales}