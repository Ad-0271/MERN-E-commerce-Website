const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const Product = require("../models/productModel");

const getOne = catchAsyncErrors(async (req, res, next) => {
  const item = await Product.findById(req.params.id).lean().exec();

  if (!item) {
    return next(new ErrorHandler("Item not found", 404));
  }

  return res.status(200).send({ status: "success", item });
});

const getAll = catchAsyncErrors(async (req, res, next) => {
  const productCount = await Product.countDocuments();

  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination();

  const items = await apiFeatures.result;

  return res.status(200).send({ status: "success", productCount, items });
});

const post = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const item = await Product.create(req.body);

  return res.status(200).send({ status: "success", item });
});

const updateOne = catchAsyncErrors(async (req, res, next) => {
  const item = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!item) {
    return next(new ErrorHandler("Item not found", 404));
  }

  return res.status(200).send({ status: "success", item });
});

const deleteOne = catchAsyncErrors(async (req, res, next) => {
  const item = await Product.findByIdAndDelete(req.params.id);

  if (!item) {
    return next(new ErrorHandler("Item not found", 404));
  }

  return res
    .status(200)
    .send({ status: "success", message: "Item deleted successfully" });
});

const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (el) => el.user.toString() === req.user.id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((el) => {
      if (el.user.toString() == req.user.id.toString()) {
        el.rating = rating;
        el.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((el) => (avg += el.rating));

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({ status: "success" });
});

const getAllReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  return res.status(200).send({ status: "success", reviews: product.reviews });
});

const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (el) => el.id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((el) => (avg += el.rating));

  const ratings = reviews.length ? avg / reviews.length : 0;

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    { new: true, runValidators: false, useFindAndModify: false }
  );

  return res.status(200).send({ status: "success" });
});

module.exports = {
  post,
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createProductReview,
  getAllReviews,
  deleteReview,
};
