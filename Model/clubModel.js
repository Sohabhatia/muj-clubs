const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const clubsSchema = new mongoose.Schema({
  // SCHEMA FOR COLLECTION TOURS
  name: {
    type: String,
    required: [true, "A name for club is required"],
    unique: true,
    maxlength: [40, "Not more than 40 characters allowed!"],
    minlength: [3, "Atleast 3 characters required!"],
    /*validate: {
      validator: validator.isAlphanumeric,
      message: "Not valid input",
    },*/
  },

  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Rating should atleast be 1"],
    max: [5, "Rating cant be more than 5"],
    set: (val) => Math.round(val * 10) / 10,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },

  slug: String,
  summary: {
    type: String,
    trim: true,
    required: [true, " A summary is required"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    trim: true,
    required: [true, "A image of tour is required"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  technical: {
    type: Boolean,
    default: true,
  },
  
});

clubsSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});


const Club = mongoose.model("Club", clubsSchema);

module.exports = Club;
