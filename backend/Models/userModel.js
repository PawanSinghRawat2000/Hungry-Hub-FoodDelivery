const mongoose=require('mongoose');
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')
const validator=require('validator')

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  });

  //HASH Password
  userSchema.pre("save",async function(){
    if(!this.isModified("password")){
      return
    }
    this.password=await bcrypt.hash(this.password,10);
  })

    //JWT Token
    userSchema.methods.getJWTToken=function(){
      return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
      })
    }

  //Compare Password
  userSchema.methods.comparePassword= async function(enteredPassword){
    // console.log(this.password)
    return await bcrypt.compare(enteredPassword,this.password)
  }




  module.exports=mongoose.model('user',userSchema)