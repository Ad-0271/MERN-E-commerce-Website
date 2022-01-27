const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const router = express.Router();

const { isAuthenticatedUser, isAuthorized } = require("../middlewares/auth");

router.post("/order/new", isAuthenticatedUser, newOrder);
router.get("/order/me", isAuthenticatedUser, myOrders);
router.get("/order/:id", isAuthenticatedUser, getSingleOrder);
router.get("/admin/orders", isAuthenticatedUser, isAuthorized, getAllOrders);
router.put("/admin/order/:id", isAuthenticatedUser, isAuthorized, updateOrder);
router.delete(
  "/admin/order/:id",
  isAuthenticatedUser,
  isAuthorized,
  deleteOrder
);

module.exports = router;
