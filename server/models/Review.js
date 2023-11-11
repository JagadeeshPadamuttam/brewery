

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  breweryId: String,
  rating: Number,
  description: String,
});

const ReviewModel = mongoose.model('Review', reviewSchema);
module.exports=ReviewModel;
