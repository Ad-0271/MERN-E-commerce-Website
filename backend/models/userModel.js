const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxlength: [30, "Name cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter you email"],
      unique: true,
      validate: [validator.isEmail, "Please enter valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [8, "Password should have atleast 8 characters"],
      select: false,
    },
    avatar: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
    role: { type: String, default: "user" },
    resetPasswordToken: String,
    resetPasswordExpire: Number,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//hashing password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_ACCESS_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return new Promise((res, rej) => {
    bcrypt.compare(enteredPassword, this.password, function (err, same) {
      if (err) {
        return rej(err);
      }
      return res(same);
    });
  });
};

// Generating password reset token
userSchema.methods.getResetPasswordToken = function () {
  //creating random token
  console.log(this);
  const resetToken = crypto.randomBytes(20).toString("hex");

  // hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() * 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("user", userSchema);
