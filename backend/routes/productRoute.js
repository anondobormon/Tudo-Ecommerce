const express = require("express");
const {
  getAllProducts,
  creatProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
} = require("../controllers/productController");
const { updateUserRole, deleteUser } = require("../controllers/userController");
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");

const router = express.Router();

//GET ALL PRODUCTS
router.route("/products").get(getAllProducts);

//GET A PRODUCT DETAILS
router.route("/product/:id").get(getProductDetails);

//CREATE A NEW PRODUCT -- ADMIN
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizedRole("admin"), creatProduct);

//UPDATE A PRODUCT -- ADMIN
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizedRole("admin"), updateProduct);

//DELETE A PRODUCT -- ADMIN
router
  .route("/admin/product/:id")
  .delete(isAuthenticatedUser, authorizedRole("admin"), deleteProduct);

//Review
router.route("/review").put(isAuthenticatedUser, createProductReview);

module.exports = router;
