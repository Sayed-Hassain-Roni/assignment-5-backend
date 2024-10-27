import { Schema, model, Document } from "mongoose";

// Define the TBooking interface
export interface TBooking extends Document {
  date: string;
  startTime: string;
  endTime: string;
  userID?: string;
  transactionId?: string;
  paymentStatus?: string;
  facility: Schema.Types.ObjectId;
  isBooked: "confirmed" | "unconfirmed" | "canceled";
}

// Define the booking schema
const bookingSchema = new Schema<TBooking>(
  {
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    endTime: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
    },
    facility: {
      type: Schema.Types.ObjectId,
      ref: "Facility",
      required: true,
    },
    isBooked: {
      type: String,
      enum: ["confirmed", "unconfirmed", "canceled"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

export const BookingModel = model<TBooking>("Booking", bookingSchema);
