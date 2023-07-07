const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  plan: {
    type: String,
    enum: ["free", "monthly", "annual"],
    default: "free",
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

subscriptionSchema.pre("save", async function (next) {
  if (!this.isModified("plan")) return next();
  try {
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
