const express=require('express')
const dotenv=require('dotenv').config()
const port=process.env.PORT_NUMBER || 5000;
const connectDB=require('./config/db')
const {errorHandler}=require('./middleware/errorMiddleware')
const cloudinary=require('cloudinary')
const cookieParser=require('cookie-parser')


//Handling uncaught exception
process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message} `)
    console.log("Shutting down the server due to uncaught Exception")
    process.exit(1)
})

//connect database
connectDB()
const app=express()


//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

})


//routes
const foodItem=require('./routes/foodItemRoute')
app.use('/api/v1',foodItem)
const restaurant=require('./routes/restaurantRoute');
app.use('/api/v1',restaurant)
const user=require('./routes/userRoute')
app.use('/api/v1',user)



app.listen(port,console.log(`Server started at port no:${port}`))

app.use(errorHandler)

//unhandled Promise Rejection
process.on('unhandledRejection',err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise rejection`)
    server.close(()=>{
        process.exit(1)
    })
})
