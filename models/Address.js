const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
   customerId:{type:String,required:true},
    houseNumber:{type:String,required:true},
    street:{type:String,required:true},
    surburb:{type:String,required:true},
  
    city: {type:String,required:true},
 
});

module.exports =  mongoose.model('address', AddressSchema);