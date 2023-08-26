const mongoose= require('mongoose')

const restaurantSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter Restaurant name"],
        unique:true,
    },
    description:{
        type:String,
        required:[true,"Please enter Restaurant description"]
    },
    images:[
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            }
        }
    ],
    rating:{
        type:Number,
        default:0,
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:'user',
                required:true
            },
            name:{
                type:String,
                require:true,
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true,
            }

        }
    ],
    numOfReviews:{
        type:Number,
        default:0
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    
})

module.exports=mongoose.model('restaurant',restaurantSchema)