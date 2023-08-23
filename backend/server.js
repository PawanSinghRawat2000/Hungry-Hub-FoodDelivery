const express=require('express')
const dotenv=require('dotenv').config()
const port=process.env.PORT_NUMBER || 5000;
const connectDB=require('./config/db')
const {errorHandler}=require('./middleware/errorMiddleware')



//connect database
connectDB()
const app=express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//routes
const foodItem=require('./routes/foodItemRoute')
app.use('/api/v1',foodItem)


app.listen(port,console.log(`Server started at port no:${port}`))

app.use(errorHandler)
