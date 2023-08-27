const FoodItem = require("../Models/foodItemsModel");
const Restaurant = require("../Models/restaurantModel");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary");
const ApiFeatures = require("../utils/apiFeatures");

//CREATE FoodItem--->ADMIN
exports.createFoodItem = asyncHandler(async (req, res) => {
  let images = [];
  if (typeof req.body.images == "string") {
    images.push(req.body.images);
  } else images = req.body.images;
  let imagesLink = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "foodDeliveryAvatar",
    });
    imagesLink.push({
      public_id: result.public_id,
      url: result.url,
    });
  }

  req.body.images = imagesLink;
  req.body.user = req.user.id;
  req.body.restaurant = req.params.restaurantId;

  const foodItem = await FoodItem.create(req.body);
  res.status(201).json({
    foodItem,
  });
});

//GET all food items of a restaurant
exports.getAllFoodItems = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.restaurantId);
  const apiFeature = new ApiFeatures(FoodItem.find(), req.query)
    .search()
    .restaurantFilter(restaurant)
    .filter();

  let foodItems = await apiFeature.query;
  let filteredFoodItemsCount = foodItems.length;
  const foodItemsCount = await FoodItem.countDocuments();

  res.status(201).json({
    foodItems,
    foodItemsCount,
    filteredFoodItemsCount,
  });
});

//GET ALL food items--->ADMIN
exports.getAllFoodItemsAdmin = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.restaurantId);
  const apiFeature = new ApiFeatures(
    FoodItem.find(),
    req.query
  ).restaurantFilter(restaurant);

  let foodItems = await apiFeature.query;
  let foodItemsCount = foodItems.length;

  res.status(201).json({
    foodItems,
    foodItemsCount,
  });
});

//Update food items-->Admin
exports.updateFoodItem = asyncHandler(async (req, res) => {
  const foodItem = await FoodItem.findById(req.params.foodItemId);
  if (!foodItem) {
    res.status(404);
    throw new Error("FoodItem not Found");
  }
  let images = [];
  if (typeof req.body.images == "string") {
    images.push(req.body.images);
  } else images = req.body.images;

  if (images !== undefined) {
    //Delete older images
    for (let i = 0; i < foodItem.images.length; i++) {
      await cloudinary.v2.uploader.destroy(foodItem.images[i].public_id);
    }
    let imagesLink = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "foodDeliveryAvatar",
      });
      imagesLink.push({
        public_id: result.public_id,
        url: result.url,
      });
    }

    req.body.images = imagesLink;
    req.body.user = req.user.id;
    req.body.restaurant = req.params.restaurantId;
  }
  const updatedValue= await FoodItem.findByIdAndUpdate(
    req.params.foodItemId,
    req.body,
    {new:true}
  )
  res.status(201).json({
    updatedValue,
  });
});

//Delete FoodItem -->Admin
exports.deleteFoodItem = asyncHandler(async (req, res) => {
    const foodItem = await FoodItem.findById(req.params.foodItemId);
    if (!foodItem) {
      res.status(404);
      throw new Error("FoodItem not Found");
    }
    let images = [];
    if (typeof req.body.images == "string") {
      images.push(req.body.images);
    } else images = req.body.images;
  

      //Delete images from cloudinary
      for (let i = 0; i < foodItem.images.length; i++) {
        await cloudinary.v2.uploader.destroy(foodItem.images[i].public_id);
      }
    
    foodItem.deleteOne();
    res.status(201).json({
      message:"Deleted successfully"
    });
  });

  //Get FoodItem Details
  exports.getFoodDetails=asyncHandler(async(req,res)=>{
    const foodItem=await FoodItem.findById(req.params.foodItemId)

    if (!foodItem) {
        res.status(404);
        throw new Error("FoodItem not Found");
      }

      res.status(201).json({
        foodItem
      })
  })

 //Create New Review or update review
 exports.createFoodReview = asyncHandler(async (req, res) => {
    const { rating, comment, foodItemId } = req.body;
    const review = {
      user: req.user.id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const foodItem = await FoodItem.findById(foodItemId);
    const isReviewed = foodItem.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      foodItem.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          rev.rating = rating;
          rev.comment = comment;
        }
      });
    } else foodItem.reviews.push(review);
  
    foodItem.numOfReviews = foodItem.reviews.length;
    let avg = 0;
    foodItem.reviews.forEach((rev) => {
      avg += rev.rating;
    });
    foodItem.rating = avg / foodItem.reviews.length;
  
    await foodItem.save({
      validateBeforeSave: false,
    });
    res.status(201).json({
      success: true,
    });
  }); 

//Delete Review
exports.deleteFoodReview = asyncHandler(async (req, res) => {
  
    const foodItem = await FoodItem.findById(req.query.foodItemId);
    if (!foodItem) {
        res.status(404);
        throw new Error("FoodItem not Found");
      }

      const reviews=foodItem.reviews.filter((rev)=>{
        return rev._id.toString()!==req.query.id.toString()
      })
  
    const numOfReviews = reviews.length;
    let avg = 0;
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
    let rating = 0;
    if(reviews.length===0)rating=0;
    else taing=avg/reviews.length;
  
    await FoodItem.findByIdAndUpdate(req.query.foodItemId,
        {
            reviews,
            numOfReviews,
            rating
        },{
            new:true,
            runValidators:false,
        });
    res.status(201).json({
      message:"Review Deleted"

    });
  }); 