import { Router } from "express";
const router = Router();
import { isSignedIn, isAuthenticated } from "../controllers/auth.js";
import { getUserById } from "../controllers/user.js";
import { isAdminSignedIn, isAdminAuthenticated, isAdmin } from "../controllers/adminAuth.js";
import { getAdminUserById } from "../controllers/adminUser.js";
import { getOrderById, createOrder, getAllOrders, getOrderStatus, updateOrderStatus, getOrder, completeOrder } from "../controllers/order.js";

//params
router.param("orderId", getOrderById);
router.param("userId", getUserById);
router.param("adminId", getAdminUserById);

//create
router.post("/order/create/:userId", isSignedIn, isAuthenticated, createOrder);
//get the order
router.get("/order/:orderId", getOrder);

//Get all orders
router.get("/order/all/:adminId", isAdminSignedIn, isAdminAuthenticated, isAdmin, getAllOrders);

//status for order
router.get("/order/status/:userId", isSignedIn, isAuthenticated, getOrderStatus);
// User and Admin can update orders
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, updateOrderStatus);
router.put("/order/:orderId/status/admin/:adminId", isAdminSignedIn, isAdminAuthenticated, isAdmin, updateOrderStatus);

// Update Order
router.post("/order/:orderId/complete/:userId", isSignedIn, isAuthenticated, completeOrder);


export default router;

