import { Router } from "express";
import {
  createServiceOrderController,
  getAllServiceOrdersController,
  updateServiceOrderStatusController,
  deleteServiceOrderController,
} from "../controllers/serviceOrder.controller";

const router = Router();

router.post("/", createServiceOrderController);
router.get("/", getAllServiceOrdersController);
router.patch("/:id/status", updateServiceOrderStatusController);
router.delete("/:id", deleteServiceOrderController);

export default router;