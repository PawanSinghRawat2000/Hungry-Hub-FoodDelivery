const mongoose= require('mongoose')

const Restaurant=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter Restaurant name"]
    },
    
})