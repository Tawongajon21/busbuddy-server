const express= require('express');
const app = express();
const dotenv= require("dotenv");
const connect = require('./database/connection');
const cors= require('cors');

const authRoutes = require('./routes/auth');
const developerRoutes = require('./routes/developer-auth');
const driverRoutes = require('./routes/driver');
const conductorRoutes = require('./routes/conductor-auth');
const busRoutes = require('./routes/bus');
const companyRoutes = require('./routes/companies');
const tripRoutes = require('./routes/trip');
const passengerRoutes = require('./routes/passengers');
const onboardingRoutes = require('./routes/onboarding');
const notificationRoutes = require('./routes/notifications');
const companyOwnerRoutes = require('./routes/companyOwner-auth');
const Notification=require('./models/Notifications')
const server=require('http').createServer(app);
const {Server}=require("socket.io")
const io=new Server(server,{
    cors:{
      origin: [ 'https://busbuddy-client.vercel.app','http://localhost:3005'],
    methods:['GET','POST']
},
transports:['websocket','polling']
});

dotenv.config();

app.use('/uploads',express.static(__dirname+"/uploads"))



app.use(express.json());
let connections=0;
io.on('connection',(socket)=>{
    
    
    io.emit('message',"hello")

connections++
console.log(`Client connected : ${connections} clients connected`);
socket.on('disconnect',()=>{
    connections--
    console.log(`Client disconnected : ${connections} clients connected`);
})
socket.on('message',(message)=>{
 io.emit('message',message)
})
socket.on('markAsRead',async (notificationId)=>{
   
  let updateNotification=await  Notification.findById(notificationId)
  updateNotification.read=true;
  await updateNotification.save();

io.emit('notificationUpdated',updateNotification); 
 
})



})

app.set('io',io)


const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions))

 connect(process.env.MONGODB_URI_TWO);
 app.use((req,res,next)=>{res.locals['socketio']=io;next()})
app.use("/api/v1/auth/",authRoutes);
app.use("/api/v1/developer/",developerRoutes);
app.use("/api/v1/driver/",driverRoutes);
app.use("/api/v1/company/",companyRoutes);
app.use("/api/v1/company-owner/",companyOwnerRoutes);
app.use("/api/v1/conductor/",conductorRoutes);
app.use("/api/v1/bus/",busRoutes);
app.use("/api/v1/trip/",tripRoutes);
app.use("/api/v1/onboarding/",onboardingRoutes);
app.use("/api/v1/passenger/",passengerRoutes);
app.use("/api/v1/notification/",notificationRoutes);
server.listen(4000,(req,res)=>{
console.log('App running on server ' +4000);
})


module.exports=io
