const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const newOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.create({
    ...req.body,
    paidAt: Date.now(),
    user: req.user.id,
  });

  res.status(201).json({ status: "success", order });
});

const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({ status: "success", order });
});

const myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  //   if (!orders) {
  //     return next(new ErrorHandler("Order not found with this user", 404));
  //   }

  res.status(200).json({ status: "success", orders });
});
module.exports = { newOrder, getSingleOrder, myOrders };
