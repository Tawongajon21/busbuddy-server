const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ManagerSchema = new Schema({
    email: {type:String,required:true},
    name: {type:String,required:true},
    surname: {type:String,required:true},
    password: {type:String,required:true},
    salt:{type:String,required:true},
    phone: {type:String,required:true},
    isAdmin:{
        type:Boolean,
        default:true
    }
 
},{
    toJSON: {
        transform(doc, ret){
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
        }
    },
    timestamps: true
});

const Manager =  mongoose.model('manager', ManagerSchema);

module.exports=Manager