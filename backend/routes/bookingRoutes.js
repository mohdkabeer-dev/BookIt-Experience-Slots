import express from "express";
import Booking from "../models/Booking.js";
import Experience from "../models/experience.js";

const router = express.Router();

// ----------------------- POST route for Booking --------------------
router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      experienceId,
      experienceName,
      selectedDate,
      selectedTime,
      quantity,
      total,
      refId,
    } = req.body;

    // ---------------- Validation for required fields ----------------
    if (
      !name ||!email || !experienceId || !selectedDate || !selectedTime || !quantity ||!total ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // ---------------- Find experience by ID ----------------
    const exp = await Experience.findById(experienceId);
    if (!exp) {
      return res.status(404).json({ success: false, message: "Experience not found" });
    }

    // ---------------- Find date entry ----------------
    const dateEntry = exp.availableSlots.find((d) => d.date === selectedDate);
    if (!dateEntry) {
      return res.status(404).json({ success: false, message: "Selected date not found" });
    }

    // ---------------- Find time slot inside that date ----------------
    const slot = dateEntry.slots.find((s) => s.time === selectedTime);
    if (!slot) {
      return res.status(404).json({ success: false, message: "Selected time slot not found" });
    }

    // ---------------- Check slot availability ----------------
    if (slot.available < quantity) {
      return res.status(400).json({ success: false, message: "Not enough slots available" });
    }

    // ---------------- Reduce the available slots ----------------
    slot.available -= quantity;
    await exp.save();

    // ---------------- Create new booking ----------------
    const newBooking = new Booking({
      name,
      email,
      experienceId,
      experienceTitle: experienceName,
      date: selectedDate,
      time: selectedTime,
      quantity,
      totalAmount: total,
      refId,
    });

    await newBooking.save();

    return res.json({
      success: true,
      message: "Booking successful!",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while booking.",
      error: error.message,
    });
  }
});

export default router;
