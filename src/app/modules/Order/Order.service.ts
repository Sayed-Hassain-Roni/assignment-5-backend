import { Document, Types } from "mongoose";
import { BookingModel, TBooking } from "./Order.model";
import { initiatePayment } from "../payment/payment.utils";

// Create a new booking
export const createBooking = async (
  data: Partial<TBooking>
): Promise<TBooking> => {
  try {
    const newBooking = new BookingModel(data);

    initiatePayment(0);
    return await newBooking.save();
  } catch (error) {
    throw new Error("Error creating booking");
  }
};

// Get a booking by ID
export const getBookingById = async (id: string): Promise<TBooking | null> => {
  try {
    return await BookingModel.findById(id).populate("facility").exec();
  } catch (error) {
    throw new Error("Error get booking");
  }
};

// Update a booking
export const updateBooking = async (
  id: string,
  data: Partial<TBooking>
): Promise<TBooking | null> => {
  try {
    return await BookingModel.findByIdAndUpdate(id, data, { new: true }).exec();
  } catch (error) {
    throw new Error("Error updateing booking");
  }
};

// Delete a booking
export const deleteBooking = async (id: string): Promise<Document | null> => {
  try {
    return await BookingModel.findByIdAndDelete(id).exec();
  } catch (error) {
    throw new Error("Error deleting booking");
  }
};

export const getAllBookings = async () => {
  try {
    return await BookingModel.find({});
  } catch (error) {
    throw new Error("Error found");
  }
};
