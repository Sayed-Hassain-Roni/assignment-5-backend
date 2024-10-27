import { Router } from "express";
import {
  checkAvailabilityController,
  createFacilityController,
  deleteFacilityByIdController,
  getAllFacilitiesController,
  getFacilityByIdController,
  updateFacilityByIdController,
} from "./slots.controller";

const router = Router();

router.post("/facility", createFacilityController);

router.get("/facility/:id", getFacilityByIdController);

router.get("/facilities", getAllFacilitiesController);

router.put("/facility/:id", updateFacilityByIdController);

router.delete("/facility/:id", deleteFacilityByIdController);

router.get("/check-availability", checkAvailabilityController);

export const TimeSlotsRoutes = router;
