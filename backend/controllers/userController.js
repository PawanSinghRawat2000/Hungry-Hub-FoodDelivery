const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendToken = require("../utils/jwtToken");

//Register a user
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, avatar } = req.body;
  //for image url and public_id from cloudinary

  try {
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "foodDeliveryAvatar",
      crop: "scale",
      width: 150,
    });
    console.log("Cloudinary upload successful", myCloud);
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    if (!user) {
      return res.status(500).json({ message: "User creation failed" });
    }
    sendToken(user, 201, res);
  } catch (error) {
    console.log("Cloudinary upload error",error)
  }
});

//login user
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401);
    throw new Error("Please enter Email and Password");
  }
  const user = await User.findOne({ email }).select("+password");
  // console.log(user)
  if (!user) {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
  // console.log(user.password)
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
  sendToken(user, 201, res);
});

//logout user
exports.logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", null, {
    expiresIn: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    message: "User Logged out successfully",
  });
});

//Forget Password-->get resetPasswordToken -->resetPassword

//Get user details
exports.getUserDetails = asyncHandler(async (req, res) => {
  // console.log(req.user)
  const user = await User.findById(req.user.id);
  res.status(200).json({
    user,
  });
});

//update user password
exports.updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    res.status(401);
    throw new Error("Old password is incorrect");
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    res.status(400);
    throw new Error("Password doesnt match");
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

//Update user profile
exports.updateProfile = asyncHandler(async (req, res) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      crop: "scale",
      width: 150,
    });
    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAnsModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//Get all users--->ADMIN
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    users,
  });
});

//Get Single User -->ADMIN
exports.getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new error("User not found");
  }
  res.status(200).json({
    user,
  });
});

//Update user role--->ADMIN
exports.updateRole = asyncHandler(async (req, res) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    role: req.body.role,
  });
});

//Delete user-->ADMIN
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const imageId = user.avatar.public_id;
  await cloudinary.v2.upload.destroy(imageId);

  await user.deleteOne();

  re.status(200).json({
    message: "User deleted successfully",
  });
});
