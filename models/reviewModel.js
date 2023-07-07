const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  body: {
    type: String,
    trim: true,
    minLength: [10, "Minimum review length is 10 characters"],
    maxLength: [500, "Maximum review length is 500 characters"],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Review", reviewSchema);
