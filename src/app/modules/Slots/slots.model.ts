import mongoose, { Schema } from "mongoose";
import { Facility } from "./slots.interface";

const SlotSchema = new Schema({
  date: { type: String, required: true },
  slots: [
    {
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
  ],
});

const FacilitySchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  isDeleted: { type: Boolean, required: true },
  pricePerHour: { type: Number, required: true },
  image: { type: String, required: true },
  availability: [SlotSchema],
});

const FacilityModel = mongoose.model<Facility>("FacilityList", FacilitySchema);
export default FacilityModel;
