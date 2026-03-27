import { Router } from "express";
import { complaintController } from "./complaint.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createComplaintSchema } from "./complaint.validation";
import { protect } from "../../middlewares/auth.middleware";

const router = Router();

router.use(protect); // All complaint routes require authentication

router.post(
  "/",
  validate(createComplaintSchema),
  complaintController.createComplaint
);

router.get("/my-complaints", complaintController.getMyComplaints);

export default router;
