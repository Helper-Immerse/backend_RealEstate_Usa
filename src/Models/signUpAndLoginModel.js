const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, "Please provide your First Name"],
    },
    lname: {
      type: String,
      required: [true, "Please provide your Last Name"],
    },
    type: {
      type: String,
      required: [true, "Please provide your role type"],
    },
    email: {
      type: String,
      required: [true, "Please provide your Email-ID"],
      unique: true,
      validate: [validator.isEmail, "Not a valid Email-ID"],
    },
    phone: {
      type: String,
      required: [true, "Please provide your Mobile number"],
      unique: true,
      validate: [validator.isMobilePhone, "Not a valid phone"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [8, "Password should be greater than 8 characters"],
    },
    accessToken: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

const userLoginSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide your Email-ID"],
      unique: true,
      validate: [validator.isEmail, "Not a valid Email-ID"],
    },
    phone: {
      type: String,
      required: [false, "Please provide your Mobile number"],
      unique: true,
      validate: [validator.isMobilePhone, "Not a valid phone"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [8, "Password should be greater than 8 characters"],
    },
    accessToken: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);

module.exports = mongoose.model("users", userLoginSchema);