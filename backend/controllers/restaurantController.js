const Restaurant = require("../Models/restaurantModel");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary");
const ApiFeatures = require("../utils/apiFeatures");

//Register a restaurant-->ADMIN
exports.createRestaurant = asyncHandler(async (req, res) => {
  //for image url and public_id from cloudinary
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else images = req.body.images;

  const imagesLink = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "foodDeliveryAvatar",
      crop: "scale",
    });
    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLink;
  req.body.user = req.user.id;

  const restaurant = await Restaurant.create(req.body);

  res.status(201).json({
    restaurant,
  });
});

//Get All Restaurants
exports.getAllRestaurants = asyncHandler(async (req, res) => {
  const resultPerPage = 8;

  const apiFeature = new ApiFeatures(Restaurant.find(), req.query)
    .search()
    .filter();

  let restaurants = await apiFeature.query;
  let filteredRestaurantCount = restaurants.length;
  apiFeature.pagination(resultPerPage);
  restaurants = await apiFeature.query.clone();
  const restaurantCount = await Restaurant.countDocuments();

  res.status(201).json({
    restaurants,
    restaurantCount,
    resultPerPage,
    filteredRestaurantCount,
  });
});

//Get All Restaurants -->ADmin
exports.getAdminRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find();

  res.status(201).json({
    restaurants,
  });
});

//Update Restaurants--->ADMIN
exports.updateRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) {
    res.status(404);
    throw new Error("restaurant not found");
  }
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else images = req.body.images;

  if (images !== undefined) {
    //DELETE IMAGE FROM CLOUDINARY TOO
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLink = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "foodDeliveryAvatar",
      });
      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLink;
    req.body.user = req.user.id;
  }

  const updatedValue = await Restaurant.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({
    updatedValue,
  });
});

//Delete Restaurants-->ADMIN
exports.deleteRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) {
    res.status(404);
    throw new Error("restaurant not found");
  }
  await restaurant.deleteOne();
  res.status(200).json({
    message: "Deleted Successfully",
  });
});

//Get Restaurant Details
exports.getRestaurantDetails = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) {
    res.status(404);
    throw new Error("restaurant not found");
  }

  res.status(200).json({
    restaurant,
  });
});

//Create New Review or update Review
exports.createRestaurantReview = asyncHandler(async (req, res) => {
  const { rating, comment, restaurantId } = req.body;
  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const restaurant = await Restaurant.findById(restaurantId);
  const isReviewed = restaurant.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    restaurant.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else restaurant.reviews.push(review);

  restaurant.numOfReviews = restaurant.reviews.length;
  let avg = 0;
  restaurant.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  restaurant.rating = avg / restaurant.reviews.length;

  await restaurant.save({
    validateBeforeSave: false,
  });
  res.status(201).json({
    success: true,
  });
});

//Get All reviews of a Restaurant
exports.getRestaurantReviews = asyncHandler(async (req, res) => {

  const restaurant = await Restaurant.findById(req.query.id);
//   console.log(restaurant)
  if (!restaurant) {
    res.status(404);
    throw new Error("restaurant not found");
  }
  res.status(201).json({
    reviews: restaurant.reviews,
  });
});


//Delete Review
exports.deleteReview = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.query.restaurantId);
  if (!restaurant) {
    res.status(404);
    throw new Error("restaurant not found");
  }
  const reviews = restaurant.reviews.filter((rev) => {
    return rev._id.toString() !== req.query.id.toString();
  });


  const numOfReviews = reviews.length;
  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  let rating = 0;
  if (reviews.length === 0) rating = 0;
  else rating = avg / reviews.length;

  await Restaurant.findByIdAndUpdate(
    req.query.restaurantId,
    {
      reviews,
      numOfReviews,
      rating,
    },
    { new: true, runValidators: false, useFindAndModify: false }
  );

  res.status(201).json({
    message:"Review deleted successfully"
  })
});
