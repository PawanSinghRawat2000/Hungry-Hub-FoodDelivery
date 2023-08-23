const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter item name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter item description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter item Price"],
    maxLength: [8, "Price too High!"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter Item category"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
//   user: {
//     type: mongoose.Schema.ObjectId,
//     ref: "user",
//     required: true,
//   },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports=mongoose.model("FoodItem",foodItemSchema)
