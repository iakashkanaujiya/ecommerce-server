import { Router } from "express";
const router = Router();
import { signout, signin, signup, isSignedIn, verifySessionToken } from "../controllers/auth.js";
import { adminSignup, adminSignin, adminSignout } from "../controllers/adminAuth.js";

//user signup
router.post("/signup", signup);
//user signin
router.post("/signin", signin);
// token
router.post("/token", verifySessionToken);
//test route
router.get("/testroute", isSignedIn, (req, res) => {
    res.json(req.auth);
});
//user signout
router.get("/signout", signout);


// Admin Signup
router.post("/admin/signup", adminSignup);
//Admin signin
router.post("/admin/signin", adminSignin);
//user signout
router.get("admin/signout", adminSignout);


export default router;