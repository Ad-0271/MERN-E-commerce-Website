const express = require("express");

const { isAuthenticatedUser, isAuthorized } = require("../middlewares/auth");

const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUsers,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/me", isAuthenticatedUser, getUserDetails);
router.put("/update/password", isAuthenticatedUser, updatePassword);
router.put("/me/update", isAuthenticatedUser, updateProfile);
router.get("/admin/users", isAuthenticatedUser, isAuthorized, getAllUsers);
router.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  isAuthorized,
  getSingleUsers
);
router.put("/admin/user/:id", isAuthenticatedUser, isAuthorized, updateProfile);
router.delete("/admin/user/:id", isAuthenticatedUser, isAuthorized, deleteUser);

module.exports = router;
