const  express= require('express');
const isAuth = require('../middlewares/auth');
const {createNotification,readNotification,getNotifications} =require('../controllers/notifications')
const notificationRoutes= express.Router();

notificationRoutes.post("/create-notification",isAuth,createNotification);
notificationRoutes.put('/read/:id',isAuth,readNotification);
notificationRoutes.get('/get-notifications',isAuth,getNotifications);


/*
adminRoutes.put("/update-profile",isAuth,EditAdminProfile);
adminRoutes.get("/get-profile",isAuth,GetAdminProfile);
*/


module.exports=notificationRoutes