const express=require('express');
const { createFoodItem } = require('../controllers/foodItemController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router=express.Router()

router.route('/:restaurantId/foodItem/create').post(isAuthenticatedUser,authorizeRoles('admin'), createFoodItem);

module.exports=router