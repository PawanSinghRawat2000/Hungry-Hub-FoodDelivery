const express = require("express");
const {
  createFoodItem,
  getAllFoodItems,
  getAllFoodItemsAdmin,
  updateFoodItem,
  deleteFoodItem,
  getFoodDetails,
  createFoodReview,
  deleteFoodReview,
} = require("../controllers/foodItemController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router
  .route("/:restaurantId/foodItem/create")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createFoodItem);
router.route("/:restaurantId/foodItems").get(getAllFoodItems);
router
  .route("/admin/:restaurantId/foodItems")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllFoodItemsAdmin);
router
  .route("/admin/:restaurantId/:foodItemId")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateFoodItem)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteFoodItem);

  router
  .route("/:restaurantId/:foodItemId").get(getFoodDetails)

  router
  .route("/foodItem/review").put(isAuthenticatedUser,createFoodReview)

  router
  .route("/foodItem/review").delete(isAuthenticatedUser,deleteFoodReview)

module.exports = router;
