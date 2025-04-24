const mongoose=require("mongoose");
const notifier=require('node-notifier')

const TripSchema=new mongoose.Schema({

    to:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    departure:{
        type:String,
        required:true
    },
    arrival:{
        type:String,
        required:true
    },
    busfare:{
        type:Number,
        required:true
    },
    capacity:{
        type:Number,
        required:true
    },
    passengers:[
        {
            name:{
                type:String,
                required:true
            },
            surname:{
                type:String,
                required:true
            },
            phone:{
                type:String,
                required:true
            },
            email:{
                type:String
            },
            to:{
                type:String,
                required:true
            },
            from:{
                type:String,
                required:true
            },
            bus:{
                type:String,
             
                required:true
            },
            busfare:{
                type:String,
             
                required:true
            },
            seatNumber:{
                type:String,
                required:true
        
            },
            nextOfKinContactDetails:{
                type:String,
                required:true
        
            },
            tripId:{
                type:String,
                required:true
            },
            idNumber:{
                type:String,
                required:true
            },
            idType:{
                type:String,
                required:true
            },
            noOfBags:{
                type:String,
                required:true
            },
            paid:{
                type:Boolean
            },
            paymentMethod:{
                type:String
            },
            passengerId:{
                type:String
            }
        
        }
    ],
    dropOffAreas:[
        {
            from:{
                type:String
            },
            to:{
                type:String
            },
            busfare:{
                type:String,
                
            }
        }
      
     
    ],
 
    
    bus:[
       {
        _id:{
            type:String,
            required:true
        },
        busName:{
            type:String,
            required:true
        },
        company:{
            type:String,
            required:true
        },
        registrationNumber:{
            type:String,
            required:true
        },
        capacity:{
            type:Number,
            required:true
        },
        images:[
            {
                newPath:String,
                 thumbnail:String
              }
        ],
      
        seats:[
            {
                seatNumber:{
                    type:String
                },
                occupied:{
                    type:Boolean,
                    default:false
                }
            }
          
         
        ],
 

       }
    ],
    driver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"driver",
        required:true

    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"company",
        required:true
    },
    conductor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"conductor",
        required:true
    },
    
})


const Trip= mongoose.model("trip",TripSchema);
const changeStream=Trip.watch();
changeStream.on("change",(change)=>{
    console.log(change);
    if (change.operationType==='insert') {
        triggerNotification(change.fullDocument)
    }
})
async function triggerNotification(ticketData) {
    try {
        console.log("Triggering notification for new ticket");
   let trigger=   await sendNotification(ticketData)  
   console.log(trigger);
    } catch (error) {
        console.error(error)
    }
}

async function sendNotification(ticketData){
    try {
notifier.notify({
    title:'New Ticket',
    message:`Ticket ${ticketData._id} has been created`
})
    } catch (error) {
        console.error(error)
    }
}

module.exports=Trip;
