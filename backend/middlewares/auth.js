const jwt = require("jsonwebtoken");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

const User = require("../models/userModel");

const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_ACCESS_KEY);

  req.user = await User.findById(decodedData.id);

  next();
});

const isAuthorized = (req, res, next) => {
  const authorizedRoles = ["admin"];

  if (!authorizedRoles.includes(req.user.role)) {
    return next(
      new ErrorHandler(
        `Role ${req.user.role} is not allowed to access this resource`,
        403
      )
    );
  }

  next();
};

module.exports = { isAuthenticatedUser, isAuthorized };
