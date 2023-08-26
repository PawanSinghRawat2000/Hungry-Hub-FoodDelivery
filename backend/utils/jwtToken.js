//Create Token and store in cookie

const sendToken= (user,statusCode,res)=>{
    const token=user.getJWTToken();
    // console.log(token)

    const options={
        httpOnly:true,
        expiresIn:Date.now()+5*24*60*60*1000,
    };
    res.status(statusCode).cookie('token',token,options).json({
        user,
        token
    })
}

module.exports=sendToken