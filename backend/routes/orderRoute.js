const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");
const { updateOne } = require("../models/orderModel");

//Create a new order
router.route("/order/new").post(isAuthenticatedUser, newOrder);

//Get a single order
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

//Get all orders --my Order
router.route("/orders/me").get(isAuthenticatedUser, myOrder);

//Get all order -- admin
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizedRole("admin"), getAllOrders);

//Update order --Admin
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizedRole("admin"), updateOrder);

//Delete order --Admin
router
  .route("/admin/order/:id")
  .delete(isAuthenticatedUser, authorizedRole("admin"), deleteOrder);

module.exports = router;
