const express=require('express')
const { createRestaurant, getAllRestaurants, getAdminRestaurants, updateRestaurant, deleteRestaurant, getRestaurantDetails, createRestaurantReview, getRestaurantReviews, deleteReview } = require('../controllers/restaurantController')
const {isAuthenticatedUser, authorizeRoles}=require('../middleware/auth')
const router=express.Router()

router.route('/restaurants').get(getAllRestaurants);

router.route('/admin/restaurant/create').post(isAuthenticatedUser,authorizeRoles("admin"), createRestaurant);
router.route('/admin/restaurants').get(isAuthenticatedUser,authorizeRoles('admin'),getAdminRestaurants);
router.route('/admin/restaurant/:id')
.put(isAuthenticatedUser,authorizeRoles('admin'),updateRestaurant)
.delete(isAuthenticatedUser,authorizeRoles('admin'),deleteRestaurant)

router.route('/restaurant/:id').get(getRestaurantDetails)
router.route('/restaurant/review').put(isAuthenticatedUser,createRestaurantReview)

router.route('/reviews').get(getRestaurantReviews).delete(deleteReview)


module.exports=router