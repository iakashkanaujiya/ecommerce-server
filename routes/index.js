import { Router } from "express";
const router = Router();

/**
 * @description: Routes
*/
import authRoutes from "./auth.js";
import userRoutes from "./user.js";
import categoryRoutes from "./category.js";
import productRoutes from "./product.js";
import orderRoutes from "./order.js";
import fileUploadRoutes from "./fileUpload.js";
import paymentRoutes from "./payment.js";

router.use("/", authRoutes);
router.use("/", authRoutes);
router.use("/", userRoutes);
router.use("/", categoryRoutes);
router.use("/", productRoutes);
router.use("/", orderRoutes);
router.use("/", fileUploadRoutes);
router.use("/", paymentRoutes);

export default router;