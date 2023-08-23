const express=require('express');
const { createFoodItem } = require('../controllers/foodItemController');
const router=express.Router()

router.route('/foodItem/create').post(createFoodItem);

module.exports=router