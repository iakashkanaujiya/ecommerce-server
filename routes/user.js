import { Router } from "express";
const router = Router();
import { isSignedIn, isAuthenticated } from "./../controllers/auth.js";
import { getUserById, getUser, updateUser, userPurchaseList, addUserAddress, getUserAddress, updateUserAddress, getAddress, deleteUserAddress } from "../controllers/user.js";


// Middleware
router.param("userId", getUserById);

// Get the User
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
// Update User
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);


// Add user Shipping Adress
router.post("/user/address/:userId", isSignedIn, isAuthenticated, addUserAddress);
// Get Address
router.get("/address", getAddress);
router.get("/user/address/:userId", isSignedIn, isAuthenticated, getUserAddress);
// Delete Address
router.delete("/user/address/:userId", isSignedIn, isAuthenticated, deleteUserAddress);
// Update user Address
router.put("/user/address/:userId", isSignedIn, isAuthenticated, updateUserAddress);

// User's Orders List
router.get("/user/orders/:userId", isSignedIn, isAuthenticated, userPurchaseList);
export default router;