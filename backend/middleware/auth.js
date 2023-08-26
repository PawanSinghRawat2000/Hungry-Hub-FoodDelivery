const asyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
const User=require('../Models/userModel')

exports.isAuthenticatedUser=asyncHandler(async(req,res,next)=>{
    const {token}=req.cookies;
    // console.log(token)
    if(!token){
        res.status(401);
        throw new Error('Please login to access resource');
    }
    const decodedData=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decodedData.id);
    //  console.log(req.user)
    next();
})

exports.authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            res.status(403);
            throw new Error("You are not allowed to access this resource")
        }
        next();
    }
}