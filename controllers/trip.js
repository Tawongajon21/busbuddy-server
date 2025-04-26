const Bus=require("../models/Bus")
const Trip=require("../models/Trip");
const Ticket=require("../models/Ticket")
const Passenger=require("../models/Passenger")
const Conductor=require("../models/Conductor")
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
    
console.log(displayQr);
let departureDate=fixDate(departure)
let arrivalDate=fixDate(arrival);



let html=`<style>
:root{
  --red:#ff8000;
  --grey:#ecedef;
  --black:#343434;
  --nav-blue:#203040;
  --light-gray:#817f7f;
  --nav-link-blue:blue;
  --box-shadow: 0 10px 10px -5px rgba(0,0,0,0.2)

}
.top-part{
background-color: #ff8000;
padding-top: 1rem;
padding-bottom: 0.5rem;
width: 27em;
padding-left: 1rem;
margin-left: -1rem;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
}

.cardWrap {
width: 27em;
margin: 3em auto;
color: #fff;
font-family: sans-serif;
}

.card {

height: 11em;
float: left;
position: relative;
padding: 1em;
margin-top: 100px;
}

.cardLeft {
border-top-left-radius: 8px;
border-bottom-left-radius: 8px;
width: 16em;
}

.cardRight {
width: 6.5em;
border-left: .18em dashed #fff;
border-top-right-radius: 8px;
border-bottom-right-radius: 8px;


}
.cardRight:before{
content: "";
  position: absolute;
  display: block;
  width: .9em;
  height: .9em;
  background: #fff;
  border-radius: 50%;
  left: -.5em;
}

.cardRight:after {
  content: "";
  position: absolute;
  display: block;
  width: .9em;
  height: .9em;
  background: #fff;
  border-radius: 50%;
  left: -.5em;
}
.cardRight:before {
  top: -.4em;
}
.cardRight:after {
bottom: -.4em;
}

h1 {
font-size: 1.1em;
margin-top: 0;
display: flex;
align-items: center;
gap: 0.4rem;

}
.span-left {
  font-weight: normal;
  color: #fff;
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: bold;

}
.title{
text-transform: uppercase;
font-weight: normal;
}
.name{
text-transform: uppercase;
font-weight: normal;
} 
.seat{
text-transform: uppercase;
font-weight: normal;
} 
.time {
text-transform: uppercase;
font-weight: normal;


}
h2 {
  font-size: .9em;
  color: #525252;
  margin: 0;
 }
 span {
  font-size: .7em;
  color: darkgray;
  
}

.title {
margin: 2em 0 0 0;
}

.name{
margin: .7em 0 0 0;
}
.seat {
margin: .7em 0 0 0;
}

.time {
margin: .7em 0 0 1em;
}

.seat, .time {
float: left;
}

.eye {
position: relative;
width: 2em;
height: 1.5em;
background: #fff;
margin: 0 auto;
border-radius: 1em/0.6em;
z-index: 1;

}

.eye :before{
content:"";
  display: block;
  position: absolute;
  border-radius: 50%;
}
.eye:after {
  content:"";
  display: block;
  position: absolute;
  border-radius: 50%;
}
.eye:before {
  width: 1em;
  height: 1em;
  background: #ff8000;
  z-index: 2;
  left: 8px;
  top: 4px;
}
.eye:after {
width: .5em;
height: .5em;
background: #fff;
z-index: 3;
left: 12px;
top: 8px;
}

.number {
text-align: center;
text-transform: uppercase;

}
h3 {
  color: #ff8000;
  margin: .9em 0 0 0;
  font-size: 2.5em;
  
}
span {
  display: block;
  color: #a2aeae;
}
.barcode {
height: 2em;
width: 0;
margin: 1.2em 0 0 .8em;
box-shadow: 1px 0 0 1px var(--black),
5px 0 0 1px var(--black),
10px 0 0 1px var(--black),
11px 0 0 1px var(--black),
15px 0 0 1px var(--black),
18px 0 0 1px var(--black),
22px 0 0 1px var(--black),
23px 0 0 1px var(--black),
26px 0 0 1px var(--black),
30px 0 0 1px var(--black),
35px 0 0 1px var(--black),
37px 0 0 1px var(--black),
41px 0 0 1px var(--black),
44px 0 0 1px var(--black),
47px 0 0 1px var(--black),
51px 0 0 1px var(--black),
56px 0 0 1px var(--black),
59px 0 0 1px var(--black),
64px 0 0 1px var(--black),
68px 0 0 1px var(--black),
72px 0 0 1px var(--black),
74px 0 0 1px var(--black),
77px 0 0 1px var(--black),
81px 0 0 1px var(--black);
}
</style>



<div class="cardWrap">
<div class="card cardLeft">
  <div class="top-part">
    <h1 >EagleLiner |  <span class="span-left">  ${newTicket.from} - ${newTicket.to}</span></h1>
  </div>
 
  <div class="title">
    <h2>Departure ${departureDate.date} ${departureDate.time} ${departureDate.time[0]==="0" && "AM"}</h2>
    <span>${departureDate.date}</span>
  </div>
  <div class="name">
    <h2>${newTicket.name} ${newTicket.surname}</h2>
    <span>name</span>
  </div>
  <div class="seat">
    <h2>${newTicket.seatNumber}</h2>
    <span>seat</span>
  </div>

  
</div>
<div class="card cardRight">
  <div class="eye"></div>
  <div class="number">
    <h3>${newTicket.seatNumber}</h3>
    <span>seat</span>
  </div>
  <div class="barcode"></div>
</div>

</div>

`

const browser=await puppeteer.launch();
const page=await browser.newPage()
await page.setContent(html);
const pdfBuffer=await page.pdf({
    path:`${newTicket.name} ${newTicket.surname} ticket.pdf`,
 format:"A4",
 margin:{
    top:'20px',
    right:'20px',
    bottom:'20px',
    left:'20px'
 }
})
await browser.close();

sendEmail(`${newTicket.name} ${newTicket.surname}`,`${newTicket.name} ${newTicket.surname} ticket.pdf`,pdfBuffer)


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

