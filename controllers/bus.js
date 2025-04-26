const Bus=require("../models/Bus")
const sharp=require("sharp")

const fs=require('fs')
const CreateBus=async(req,res)=>{
try {
    
    function addSeats(capacity) {
        let seat;
        let seats=[]
        for(let i=1;i<=capacity;++i){
seat={seatNumber:i,occupied:false}
seats.push(seat)
        }
        return seats
    }



    const {busName,company,capacity,registrationNumber}=req.body;
    let newPath;
  
let files=req.files;
let newArray



async    function handleFile(data){
let image;
for(let i=0;i<data.length;++i){
const {originalname,path}=data[i];
const parts= originalname.split('.');
const ext= parts[parts.length-1];
newPath=path+'.'+ext;

fs.renameSync(path,newPath)
 async  function createThumbnail(data) {
 let getData=await sharp(data).resize(100,100).jpeg({quality:80}).toBuffer();
 let convertedString=getData.toString('base64')
    return convertedString
}

let thumbnail= await createThumbnail(newPath);

image={newPath,thumbnail}

}
 
let newFiles=[];
newFiles.push(image)


return newFiles


}


if (files.length>0) {
let fileData=await handleFile(files);
newArray=fileData
  }



const addBus=await Bus.create({
    busName,company,registrationNumber,capacity,seats:addSeats(capacity),images:newArray
})
 

res.status(200).json(addBus);


} catch (error) {
    console.log(error);
   res.status(500).json({msg:"Server error"}) 
}
}

const GetBuses=async(req,res)=>{

    try {
        const buses=await Bus.find();
        res.status(200).json(buses)
    } catch (error) {
        res.status(500).json({msg:"Server error"})
    }
}

const GetBus=async(req,res)=>{

    try {
        const id=req.params.id;
        const buses=await Bus.findById(id);
        res.status(200).json(buses)
    } catch (error) {
        res.status(500).json({msg:"Server error"})
    }
}
const DeleteBus=async(req,res)=>{

    try {
        const id=req.params.id;
        const buses=await Bus.findByIdAndDelete(id);
        if (!buses) {
            res.status(200).json({msg:"Item not found"})
        }
        res.status(200).json({msg:"Data has been deleted"})
      
    } catch (error) {
        res.status(500).json({msg:"Server error"})
    }
}

module.exports={CreateBus,GetBus,GetBuses,DeleteBus}