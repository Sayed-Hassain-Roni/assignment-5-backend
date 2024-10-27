// src/interfaces/facility.interface.ts
import { Document, Types } from "mongoose";

// Interface for the Facility
export interface Facility {
  name: string;
  pricePerHour: number;
  location: string;
  image: string;
  description: string;
  isDeleted?: boolean;
  availability: {
    date: string;
    slots: {
      startTime: string;
      endTime: string;
      bookings: Array<Booking>;
    }[];
  }[];
}

export interface FacilityDocument extends Facility, Document {}

// Interface for Booking
export interface Booking {
  date: string;
  startTime: string;
  endTime: string;
}
