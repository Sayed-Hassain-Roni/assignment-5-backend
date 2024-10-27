import mongoose from "mongoose";
import { Facility } from "./slots.interface";
import FacilityModel from "./slots.model";
import { AppError } from "../../Errors/AppError";

// Create a new facility
export const createFacility = async (
  facilityData: Facility
): Promise<Facility> => {
  try {
    const facility = new FacilityModel(facilityData);
    return await facility.save();
  } catch (error) {
    throw new Error("Error creating facility: " + AppError);
  }
};

// Get a facility by ID
export const getFacilityById = async (
  facilityId: string
): Promise<Facility | null> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(facilityId)) {
      throw new Error("Invalid facility ID");
    }
    return await FacilityModel.findById(facilityId).exec();
  } catch (error) {
    throw new Error("Error fetching facility: " + AppError);
  }
};

// Get all facilities
export const getAllFacilities = async (): Promise<Facility[]> => {
  try {
    return await FacilityModel.find().exec();
  } catch (error) {
    throw new Error("Error fetching facilities: " + AppError);
  }
};

// Update a facility by ID
export const updateFacilityById = async (
  facilityId: string,
  updateData: Partial<Facility>
): Promise<Facility | null> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(facilityId)) {
      throw new Error("Invalid facility ID");
    }
    return await FacilityModel.findByIdAndUpdate(facilityId, updateData, {
      new: true,
    }).exec();
  } catch (error) {
    throw new Error("Error updating facility: " + AppError);
  }
};

// Delete a facility by ID (soft delete)
export const deleteFacilityById = async (
  facilityId: string
): Promise<Facility | null> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(facilityId)) {
      throw new Error("Invalid facility ID");
    }
    return await FacilityModel.findByIdAndUpdate(
      facilityId,
      { isDeleted: true },
      { new: true }
    ).exec();
  } catch (error) {
    throw new Error("Error deleting facility: " + AppError);
  }
};

// Check facility availability by date
export const checkFacilityAvailability = async (
  facilityId: string,
  date: string
): Promise<
  { availableSlots: { startTime: string; endTime: string }[] } | string
> => {
  try {
    // Find the facility by ID
    const facility = await FacilityModel.findById(facilityId).exec();

    if (!facility) {
      return "Facility not found";
    }

    // Find availability for the specific date
    const availabilityForDate = facility.availability.find(
      (slot) => slot.date === date
    );

    if (!availabilityForDate || availabilityForDate.slots.length === 0) {
      return "No available slots for this date.";
    }

    // Filter out booked slots
    const availableSlots = availabilityForDate.slots.filter(
      (slot) => !slot.bookings || slot.bookings.length === 0
    );

    if (availableSlots.length === 0) {
      return "No available slots for this date.";
    }

    return { availableSlots };
  } catch (error) {
    throw new Error("Error fetching availability: " + AppError);
  }
};
