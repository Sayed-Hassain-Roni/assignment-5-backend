import { Request, Response } from "express";
import * as BookingService from "./Order.service";

// Create a new booking
export const createBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookingData = req.body;
    const newBooking = await BookingService.createBooking(bookingData);
    res.status(201).json({ success: true, data: newBooking });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " Error creating booking",
    });
  }
};

// Get a booking by ID
export const getBookingById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookingId = req.params.id;
    const booking = await BookingService.getBookingById(bookingId);

    if (!booking) {
      res.status(404).json({ success: false, message: "Booking not found" });
      return;
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " Error retrieving booking",
    });
  }
};

// Update a booking
export const updateBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookingId = req.params.id;
    const bookingData = req.body;

    const updatedBooking = await BookingService.updateBooking(
      bookingId,
      bookingData
    );

    if (!updatedBooking) {
      res.status(404).json({ success: false, message: "Booking not found" });
      return;
    }

    res.status(200).json({ success: true, data: updatedBooking });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " Error Updating booking",
    });
  }
};

// Delete a booking
export const deleteBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookingId = req.params.id;
    const deletedBooking = await BookingService.deleteBooking(bookingId);

    if (!deletedBooking) {
      res.status(404).json({ success: false, message: "Booking not found" });
      return;
    }

    res
      .status(200)
      .json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " Error deleteing booking",
    });
  }
};

// Get all bookings with optional filters
export const getAllBookingController = async (req: Request, res: Response) => {
  try {
    const facilities = await BookingService.getAllBookings();
    return res.status(200).json(facilities);
  } catch (error) {
    return res.status(500).json({ message: " Error deleteing booking" });
  }
};
