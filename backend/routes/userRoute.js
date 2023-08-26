const express=require('express')
const { registerUser, loginUser, logoutUser, updatePassword,getUserDetails,updateProfile,getAllUsers,getSingleUser } = require('../controllers/userController')
const {isAuthenticatedUser,authorizeRoles}=require('../middleware/auth')
const router=express.Router()


router.route('/registerUser').post(registerUser)
router.route('/loginUser').get(loginUser)
router.route('/logoutUser').get(isAuthenticatedUser, logoutUser)
router.route('/me').get(isAuthenticatedUser, getUserDetails)
router.route('/password/update').put(isAuthenticatedUser,updatePassword)
router.route('/me/update').put(isAuthenticatedUser,updateProfile)

router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),getAllUsers)
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getSingleUser)



module.exports=router