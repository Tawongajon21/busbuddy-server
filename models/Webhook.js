const mongoose= require('mongoose');


const WebhookSchema=new mongoose.Schema({
 url:{
    type:String
 }

});

const Webhook= mongoose.model('webhook',WebhookSchema);

module.exports=Webhook