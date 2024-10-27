// src/controllers/facility.controller.ts
import { Request, Response } from "express";

import { AppError } from "../../Errors/AppError";
import {
  checkFacilityAvailability,
  createFacility,
  deleteFacilityById,
  getAllFacilities,
  getFacilityById,
  updateFacilityById,
} from "./slot.services";

// Create a new facility
export const createFacilityController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newFacility = await createFacility(req.body);
    return res
      .status(201)
      .json({ message: "Facility created successfully", data: newFacility });
  } catch (error) {
    return res.status(500).json({ error: AppError });
  }
};

// Get a facility by ID
export const getFacilityByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const facilityId = req.params.id;
    const facility = await getFacilityById(facilityId);
    if (!facility) {
      return res.status(404).json({ error: "Facility not found" });
    }
    return res.status(200).json({ data: facility });
  } catch (error) {
    return res.status(500).json({ error: AppError });
  }
};

// Get all facilities
export const getAllFacilitiesController = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const facilities = await getAllFacilities();
    return res.status(200).json({ data: facilities });
  } catch (error) {
    return res.status(500).json({ error: AppError });
  }
};

// Update a facility by ID
export const updateFacilityByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const facilityId = req.params.id;
    const updatedFacility = await updateFacilityById(facilityId, req.body);
    if (!updatedFacility) {
      return res.status(404).json({ error: "Facility not found" });
    }
    return res.status(200).json({
      message: "Facility updated successfully",
      data: updatedFacility,
    });
  } catch (error) {
    return res.status(500).json({ error: AppError });
  }
};

// Soft delete a facility by ID
export const deleteFacilityByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const facilityId = req.params.id;
    const deletedFacility = await deleteFacilityById(facilityId);
    if (!deletedFacility) {
      return res.status(404).json({ error: "Facility not found" });
    }
    return res.status(200).json({
      message: "Facility deleted successfully",
      data: deletedFacility,
    });
  } catch (error) {
    return res.status(500).json({ error: AppError });
  }
};

// Check facility availability controller
export const checkAvailabilityController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { date, facilityId } = req.query;

  if (!date || !facilityId) {
    return res.status(400).json({ error: "Date and facilityId are required." });
  }

  try {
    const availabilityResult = await checkFacilityAvailability(
      facilityId as string,
      date as string
    );

    if (typeof availabilityResult === "string") {
      return res.status(404).json({ message: availabilityResult });
    }

    return res.status(200).json(availabilityResult);
  } catch (error) {
    console.error("Error checking availability:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
