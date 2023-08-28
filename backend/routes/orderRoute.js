const express=require('express')
const router=express.Router()
const {isAuthenticatedUser, authorizeRoles}=require('../middleware/auth')
const { createNewOrder, getOrderDetails, myOrders, getAllOrders, deleteOrder, updateOrder } = require('../controllers/orderController')


router.route('/order/create').post(isAuthenticatedUser,createNewOrder)

router.route("/orders/order/:orderId").get(isAuthenticatedUser, getOrderDetails);
router.route('/myOrders').get(isAuthenticatedUser,myOrders)
router.route('/admin/orders/all').get(isAuthenticatedUser,authorizeRoles('admin'),getAllOrders)
router.route('/admin/order/delete/:orderId').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteOrder)
router.route('/admin/order/update/:orderId').put(isAuthenticatedUser,authorizeRoles('admin'),updateOrder)

module.exports=router