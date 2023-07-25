import { Router } from "express";
const router = Router();
import { isSignedIn, isAuthenticated } from "../controllers/auth.js";
import { getUserById } from "../controllers/user.js";
import { initiatePaytmTransaction, getPaytmTransactionStatus, verifyPaytmChecksumHash } from "../controllers/payment/paytm/paytmPayment.js";

router.param("userId", getUserById);

router.get("/create-paytm-transaction/:userId", isSignedIn, isAuthenticated, initiatePaytmTransaction);
router.post("/verify-paytm-checksum", verifyPaytmChecksumHash);
router.get("/paytm-transaction-status", getPaytmTransactionStatus);

export default router;