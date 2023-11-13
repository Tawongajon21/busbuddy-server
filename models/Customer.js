const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    email: {type:String,required:true},
    password: {type:String,required:true},
    name:{type:String,required:true},
    salt: {type:String,required:true},
    phone:{type: String,required:true},
    isAdmin:{
        type:Boolean,
        default:false
    },
    address:[ {
        houseNo:    {
            type:String
        },
    
        street:    {
            type:String
        },
        surbub:    {
            type:String
        },
        city:    {
            type:String
        },
    
    }
   
    ],
    cart:[
        {
            type:mongoose.Types.ObjectId,
            ref:'cart'
        }
    ]


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

const Customer =  mongoose.model('customer', CustomerSchema);

module.exports=Customer;