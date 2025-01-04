import { Router } from "express";
import * as seatController from "../controllers/seat.controller.js";

const router = Router();

router.get("/", seatController.getAllSeats);
router.get("/:id", seatController.getSeatById);
router.post("/", seatController.createSeat);
router.put("/:id", seatController.updateSeat);
router.delete("/:id", seatController.deleteSeat);

export default router;
