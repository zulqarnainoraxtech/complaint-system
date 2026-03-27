import { Router } from "express";
import { societyController } from "./society.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createSocietySchema } from "./society.validation";
import { protect } from "../../middlewares/auth.middleware";

const router = Router();

router.use(protect);

router.post(
  "/",
  validate(createSocietySchema),
  societyController.createSociety
);

router.get("/", societyController.getAllSocieties);
router.get("/:id", societyController.getSocietyById);

export default router;
