const FoodItem=require('../Models/foodItemsModel')
const asyncHandler=require('express-async-handler')
const cloudinary=require('cloudinary')


//CREATE FoodItem--->ADMIN
exports.createFoodItem=asyncHandler(
    async(req,res,next)=>{
        console.log("start")
        let images=[];
        if(typeof req.body.images=='string'){
            images.push(req.body.images);
        }else images=req.body.images;
        let imagesLink=[];
        for(let i=0;i<images.length;i++){
            // const result=await cloudinary.v2.uploader.upload(images[i],{
            //     folder:'foodDeliveryAvatar'
            // })
            imagesLink.push({
                public_id:"sample",
                url:"sample",
            })
        }
        // console.log(req)
        req.body.images=imagesLink;
        req.body.user=req.user.id;
        req.body.restaurant=req.params.restaurantId;
        
        const foodItem=await FoodItem.create(req.body);
        res.status(201).json({
            foodItem
        })
    }
)

//GET all food items

//GET ALL food items--->ADMIN

//Update food items