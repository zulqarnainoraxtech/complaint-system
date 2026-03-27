import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import complaintRoutes from "../modules/complaint/complaint.routes";
import departmentRoutes from "../modules/department/department.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/complaints", complaintRoutes);
router.use("/departments", departmentRoutes);

export default router;
