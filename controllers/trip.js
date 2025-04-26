const Bus=require("../models/Bus")
const Trip=require("../models/Trip");
const Ticket=require("../models/Ticket")
const Passenger=require("../models/Passenger")
const Conductor=require("../models/Conductor")
const Company=require("../models/Company")
const qrCode=require("qrcode")
const puppeteer=require("puppeteer");
const fixDate=require("../date");
const aws=require("aws-sdk")
const User=require("../models/User")
const mailComposer=require("mailcomposer")
const socket=require('../app')
const Notification=require("../models/Notifications")


const SES_CONFIG={
    accessKeyId:process.env.SES_ACCESS_KEY,
    secretAcessKey:process.env.SES_SECRET_KEY,
    region:"us-east-1"
}
const ses=require('node-ses')

const AWS_SES= new aws.SES(SES_CONFIG)
const client=ses.createClient(SES_CONFIG);
function sendEmail(name,filename,content) {
    mailComposer({
        from:"reginaldjongwe@gmail.com",
        to:"reginaldjongwe@gmail.com",
        subject:`Your Ticket`,
        text:'Plain text',
        body:`Hello ${name} you have successfully booked your trip,kindly find below your ticket`,
        attachments:[
            {
              filename,
              content,
              encoding:"base64"
            }
        ]
    }).build((err,message)=>{
        if(err){
            console.log('Email encoding error');
        }


client.sendRawEmail({
    from:'reginaldjongwe@gmail.com',
    rawMessage:message
},


function (err,data){
if(err){
console.log("Email Error");
}else{
    console.log(data);
}
}
)

    
    })
}
let io=function (req) {
    const io=req.app.get("io")
    return io
}


const CreateTrip=async(req,res)=>{
    let user=req.user;
    let userId=user._id;

    let role=user.role;
    console.log(role);
    
const {to,from,departure,arrival,busfare,capacity,bus,dropOffAreas,driver,company,conductor}=req.body;
console.log(company);
    try {
        let item=await Bus.findById(bus);
       if (role==="companyOwner") {
        let getcompany=await Company.findOne({companyOwner:userId});
let companyId= getcompany._id;
const trip=await Trip.create(
    {
        to,from,departure,arrival,busfare,capacity,dropOffAreas,bus:item,driver,company:companyId,conductor,driver
    }
);
res.status(200).json(trip)
       }
        const trip=await Trip.create(
            {
                to,from,departure,arrival,busfare,capacity,dropOffAreas,bus:item,driver,company,conductor,driver
            }
        );


let dbUser=await User.findById(userId);

let name ="hello";
let surname="world"

if (user) {
    let newNotification=await Notification.create({
        message:`Hey ${name} ${surname} kindly note a new trip has been added,that starts from ${trip.from} to ${trip.to} and its costing $${trip.busfare}`,
        userId,
        read:false
    })
    let getNotifications=await Notification.find().lean().sort({createdAt:-1});
    io(req).emit("notification",newNotification); 

}






        res.status(200).json(trip)

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Server error"})
    }
}
const GetTrips=async(req,res)=>{


    try {
     const trips=await Trip.find();
 
  res.status(200).json(trips)
     
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Server error"})
    }
}
const GetTrip=async(req,res)=>{


    try {
        const id=req.params.id
        const trip=await Trip.findById(id).populate('company')
        .populate('conductor','-password -salt')
        .populate("driver",'-password -salt');
        if (!trip) {
            res.status(200).json({msg:"item not found"})
        }
        res.status(200).json(trip)
    } catch (error) {
        res.status(500).json({msg:"Server error"})
    }
}
const UpdateTrip=async(req,res)=>{


    try {
        const id=req.params.id
        const trip=await Trip.findByIdAndUpdate(id,{$set:req.body},{new:true});
        if (!trip) {
            res.status(200).json({msg:"item not found"})
        }
        res.status(200).json(trip)
    } catch (error) {
        res.status(500).json({msg:"Server error"})
    }
}
const DeleteTrip=async(req,res)=>{


    try {
        const id=req.params.id
        const trip=await Trip.findByIdAndDelete(id);
        if (!trip) {
            res.status(200).json({msg:"item not found"})
        }
        res.status(200).json({msg:"item deleted"})
    } catch (error) {
        res.status(500).json({msg:"Server error"})
    }
}
const AddPassenger=async(req,res)=>{


    try {
        let user=req.user;
        const {name,surname,phone,email,dropOffArea,bus,busfare,seatNumber,nextOfKinContactDetails,idNumber,idType,noOfBags,paymentMethod,to,from}=req.body;

        
        const id=req.params.id;
        if (user) {
            let userId=user._id
            const trip=await Trip.findById(id);
          
            let departure=trip.departure;
            let arrival=trip.arrival
            

          
           
            let passengerEmail=await Passenger.findOne({bus,email});
            let passengerId=await Passenger.findOne({bus,idNumber});
            let passengerIdType=await Passenger.findOne({bus,idType});
            let passengerNextOfKin=await Passenger.findOne({bus,nextOfKinContactDetails});
        
          if(passengerEmail){
                res.status(401).json({msg:"Email has already been taken by another passenger in the bus"})
            }
            else if(passengerId&&passengerIdType){
                res.status(401).json({msg:"ID Number and ID Type has already been taken by another passenger in the bus"})
            }
            else if(passengerNextOfKin){
                res.status(401).json({msg:"Next of kin number has already been taken by another passenger in the bus"})
            }
            else{


                let newPassenger= await Passenger.create({
                    name,surname,phone,email,from,to,bus,busfare,seatNumber,nextOfKinContactDetails,tripId:id,idNumber,idType,noOfBags
                })
                let passengerId= newPassenger._id;
                let text=`Name:${name}\nSurname:${surname}\nEmail: ${email}`
                let displayQr;
        
qrCode.toDataURL(text,async(err,qrCode)=>{
    if(err){
console.log(err);
    }else{
        displayQr=qrCode
        let newTicket=await Ticket.create({
            name,surname,phone,email,dropOffArea,bus,busfare,seatNumber,nextOfKinContactDetails,idNumber,idType,noOfBags,userId,from,to,departure,arrival,paymentMethod,tripId:id,passengerId,
            qrCode:qrCode.replace('data:image/png;base64,','')
        })
    







    }
})
              
            
                let passenger={
                    name,surname,phone,email,to,from,dropOffArea,bus,busfare,seatNumber,nextOfKinContactDetails,tripId:id,idNumber,idType,noOfBags,passengerId
                }
            

     let updatedStatus=true
           let updateBuss=await Trip.updateOne({_id:id,'bus.seats.seatNumber':seatNumber},{$set:{'bus.$[].seats.$[element].occupied':updatedStatus}},
        {
            arrayFilters:[
                {
                    'element.seatNumber': seatNumber
                }
            ]
        },
        );
        let _id=id
let updateTrip=await Trip.findByIdAndUpdate(_id,{$push:{passengers:passenger}},{new:true})






   
io(req).emit("newTripBooking",`New trip booking : ${newPassenger.name} ${newPassenger.surname} for the trip from ${newPassenger.from} ${newPassenger.to} `);




           res.status(200).json(newPassenger)
   
            }

            if (!trip) {
                res.status(200).json({msg:"item not found"})
            }
          
        }else{
            res.status(401).json({msg:"User not authenticated"})
        }
  
    } catch (error) {
  
        res.status(500).json({msg:"Server error"})
    }
}
const GetPassengers=async(req,res)=>{


    try {
        let user=req.user;
        let tripId=req.params.id
    
        
 
        if (user) {
          
          let passengers=await Passenger.find({tripId})
        
            if (!passengers) {
                res.status(200).json({msg:"item not found"})
            }else{
                res.status(200).json(passengers)
            }
          
        }else{
            res.status(401).json({msg:"User not authenticated"})
        }
  
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Server error"})
    }
}
const GetPassenger=async(req,res)=>{


    try {
        let user=req.user;
        let passengerId=req.params.id
    
        
 
        if (user) {
          
          let passenger=await Passenger.findById(passengerId)
        
            if (!passenger) {
                res.status(200).json({msg:"passenger not found"})
            }else{
                res.status(200).json(passenger)
            }
          
        }else{
            res.status(401).json({msg:"User not authenticated"})
        }
  
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Server error"})
    }
}
const UpdatePassenger=async(req,res)=>{


    try {
        const id=req.params.id
        const passenger=await Passenger.findByIdAndUpdate(id,{$set:req.body},{new:true});
        if (!passenger) {
            res.status(200).json({msg:"item not found"})
        }
        res.status(200).json(passenger)
    } catch (error) {
        res.status(500).json({msg:"Server error"})
    }
}
const DeletePassenger=async(req,res)=>{


    try {
        const id=req.params.id
        const passenger=await Passenger.findByIdAndDelete(id);
        if (!passenger) {
            res.status(200).json({msg:"item not found"})
        }
        res.status(200).json({msg:"item deleted"})
    } catch (error) {
        res.status(500).json({msg:"Server error"})
    }
}
const GetPassengerTrips=async(req,res)=>{
    
    try {
        let user=req.user;
        let userId=user._id
    
 
        if (user) {
     
          let tickets=await Ticket.find({userId});
        
            if (!tickets) {
                res.status(200).json({msg:"tickets not found"})
            }else{
                res.status(200).json(tickets)
            }
          
        }else{
            res.status(401).json({msg:"User not authenticated"})
        }
  
    } catch (error) {
       
        res.status(500).json({msg:"Server error"})
    }
}
const CancelTrip=async(req,res)=>{
    try {
        let user=req.user;
        let id= req.params.id
        if (user) { 
            let passenger=await  Ticket.findById(id);
            let seatNumber=passenger.seatNumber;
            let passengerId=passenger.passengerId;
            let tripId=passenger.tripId;
            let getTrip=await Trip.findById(tripId);

         
           let updateTrip=await Trip.findByIdAndUpdate(tripId,{
            $pull:{
                passengers:{passengerId}
            }
           },{new:true});

           updateTrip.bus.forEach((bus)=>{
            bus.seats.forEach((seat)=>{
                if(seat.seatNumber===seatNumber){
seat.occupied=false
                }
            })
           });
         await updateTrip.save();
let deleteTicket= await Ticket.findByIdAndDelete(id);


        



    

res.status(200).json({msg:"Journey has been canceled"})

          
        }else{
            res.status(401).json({msg:"User is not authenticated"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"server error"})
    }
}


const GetConductorTrips=async(req,res)=>{


    try {
        let user=req.user;
        let conductor=user._id
        if (user) {
            const trips=await Trip.find({conductor});
 
            res.status(200).json(trips)
        }else{
            res.status(401).json({msg:"User not authorized"})
        }
    
     
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Server error"})
    }
}

module.exports={GetConductorTrips,CancelTrip,GetPassengerTrips,DeletePassenger,CreateTrip,GetTrip,GetTrips,UpdateTrip,DeleteTrip,AddPassenger,GetPassengers,GetPassenger,UpdatePassenger}

