import { Router } from "express";
import { departmentController } from "./department.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createDepartmentSchema } from "./department.validation";
import { protect } from "../../middlewares/auth.middleware";

const router = Router();

router.use(protect);

router.post(
  "/",
  validate(createDepartmentSchema),
  departmentController.createDepartment
);

router.get("/", departmentController.getAllDepartments);

export default router;
