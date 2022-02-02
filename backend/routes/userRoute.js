const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");
const router = express.Router();

//Register a user
router.route("/register").post(registerUser);

//Login a user
router.route("/login").post(loginUser);

//Logout a user
router.route("/logout").get(logout);

//Forgot password
router.route("/password/forgot").post(forgotPassword);

//Reset Password
router.route("/password/reset/:token").put(resetPassword);

//GET A USER DETAILS
router.route("/me").get(isAuthenticatedUser, getUserDetails);

//Update Password
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

//Update a user info
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

//Get all users (Admin)
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizedRole("admin"), getAllUsers);

//Get Single User
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizedRole("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizedRole("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizedRole("admin"), deleteUser);

module.exports = router;
