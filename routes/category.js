import { Router } from "express";
const router = Router();
import { getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, deleteCategory, createSubCategory, getUniqueSubCategories, updateSubCategory, deleteSubCategory, getAllSubCategories, getSubCategory } from "../controllers/category.js";
import { getUserById } from "../controllers/user.js";
import { isAdminSignedIn, isAdminAuthenticated, isAdmin } from "../controllers/adminAuth.js";
import { getAdminUserById } from "../controllers/adminUser.js";

// params
router.param("userId", getUserById);
router.param("adminId", getAdminUserById);
router.param("categoryId", getCategoryById);

//create category
router.post("/category/create/:adminId", isAdminSignedIn, isAdminAuthenticated, isAdmin, createCategory);
router.post("/category/sub/create/:adminId", isAdminSignedIn, isAdminAuthenticated, isAdmin, createSubCategory);
//update
router.put("/category/:categoryId/:adminId", isAdminSignedIn, isAdminAuthenticated, isAdmin, updateCategory);
router.put("/category/sub/:subCategoryId/:adminId", isAdminSignedIn, isAdminAuthenticated, isAdmin, updateSubCategory);
//delete
router.delete("/category/:categoryId/:adminId", isAdminSignedIn, isAdminAuthenticated, isAdmin, deleteCategory);
router.delete("/category/sub/:subCategoryId/:adminId", isAdminSignedIn, isAdminAuthenticated, isAdmin, deleteSubCategory);

// read
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);
router.get("/category/sub/:subCategoryId", getSubCategory);
router.get("/categories/sub/:categoryId", getUniqueSubCategories);
router.get("/categories/sub", getAllSubCategories);

export default router;