const express = require("express");

const { isAuthenticatedUser, isAuthorized } = require("../middlewares/auth");

const {
  getAll,
  getOne,
  post,
  updateOne,
  deleteOne,
  createProductReview,
  getAllReviews,
  deleteReview,
} = require("../controllers/productController");

const router = express.Router();

router.get("/products", getAll);
router.get("/product/:id", getOne);
router.post("/admin/product/new", isAuthenticatedUser, isAuthorized, post);
router.put("/admin/product/:id", isAuthenticatedUser, isAuthorized, updateOne);
router.delete(
  "/admin/product/:id",
  isAuthenticatedUser,
  isAuthorized,
  deleteOne
);
router.put("/review", isAuthenticatedUser, createProductReview);
router.get("/review", getAllReviews);
router.delete("/review", isAuthenticatedUser, deleteReview);

module.exports = router;
