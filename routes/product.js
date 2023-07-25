import { Router } from "express";
const router = Router();
import { getProductById, createProduct, getProduct, getAllProducts, updateProduct, deleteProduct, getAllUniqueCategories, searchProduct } from "../controllers/product.js";
import { getUserById } from "../controllers/user.js";
import { isAdminSignedIn, isAdminAuthenticated, isAdmin } from "../controllers/adminAuth.js";
import { getAdminUserById } from "../controllers/adminUser.js";

// all of params
router.param("productId", getProductById);
router.param("userId", getUserById);
router.param("adminId", getAdminUserById);

// create the product
router.post("/product/create/:adminId", isAdminSignedIn, isAdminAuthenticated, isAdmin, createProduct);
// update the product
router.put("/product/:productId/:adminId", isAdminSignedIn, isAdminAuthenticated, isAdmin, updateProduct);
// delete the product
router.delete("/product/:productId/:adminId", isAdminSignedIn, isAdminAuthenticated, isAdmin, deleteProduct);

// get the product
router.get("/product/:productId", getProduct);
// Search the product
router.get("/products/search", searchProduct);
//listing all the products
router.get("/products", getAllProducts);

//get All Unique Categories
router.get("/products/categories", getAllUniqueCategories);

export default router;
