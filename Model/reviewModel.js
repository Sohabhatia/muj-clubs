const mongoose = require('mongoose');
const Club = require('./clubModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty!'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      
    },
    club: {
      type: mongoose.Schema.ObjectId,
      ref: 'Club',
      required: [true, 'A review must belong to some club!'],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A review must belong to some user!'],
    },
  },
  );

reviewSchema.pre(/^find/, function (next){ 
    this.populate({
        path : 'club',
        select: 'name'
    }).populate({
    path: 'user',
    select: 'name',
  });

  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
