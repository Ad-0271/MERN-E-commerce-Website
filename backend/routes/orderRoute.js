const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
} = require("../controllers/orderController");

const router = express.Router();

const { isAuthenticatedUser, isAuthorized } = require("../middlewares/auth");

router.post("/order/new", isAuthenticatedUser, newOrder);
router.get("/order/me", isAuthenticatedUser, myOrders);
router.get("/order/:id", isAuthenticatedUser, getSingleOrder);

module.exports = router;
