import { Router } from "express";
import {
  createBooking,
  getAllBookingController,
  getBookingById,
} from "./Order.controller";

const router = Router();

// Route to create an order
router.post("/create", createBooking);
router.post("/:id", getBookingById);
router.get("/allbookings", getAllBookingController);

export const orderRoutes = router;
