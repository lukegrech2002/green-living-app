import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 30,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 30,
    },
    age: { type: Number, required: false },
    childFirstName: {
      type: Number,
      default: 0,
    },
    childLastName: {
      type: Number,
      default: 0,
    },
    childAge: { type: Number, required: false },
    emailAddress: {
      type: String,
      required: true,
      maxlength: 200,
    },
    activity: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
