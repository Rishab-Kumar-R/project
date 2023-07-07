const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
  },
  role: {
    type: String,
    enum: ["As User", "As Specialists"],
    default: "user",
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  subscription: {
    type: Schema.Types.ObjectId,
    ref: "Subscription",
  },
});

// hash password before saving to database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// compare password with hashed password in database
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

userSchema.statics.findOrCreate = async function (profile) {
  try {
    let user = await this.findOne({ email: profile.email });

    if (!user) {
      user = new this({
        name: profile.name,
        email: profile.email,
        password: Math.random().toString(36).substring(7),
      });
      await user.save();
    }

    return user;
  } catch (err) {
    throw new Error(err);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
