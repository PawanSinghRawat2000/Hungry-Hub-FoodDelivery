const FoodItem=require('../Models/foodItemsModel')
const asyncHandler=require('express-async-handler')


//CREATE FoodItem--->ADMIN
exports.createFoodItem=asyncHandler(
    async(req,res,next)=>{
        try{
            const foodItem=await FoodItem.create(req.body);
            res.status(200).json({
                success:true,
                foodItem,
            })
        }catch(error){
            throw new Error(error)
        }
        

    }
)

//GET all food items

//GET ALL food items--->ADMIN

//Update food items