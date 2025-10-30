import express from "express";
import Experience from "../models/experience.js";

const router = express.Router();

// ------------ GET all experiences / HOme page -------------------------
router.get("/", async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({
      message: "Could not load experiences",
      error: error.message,
    });
  }
});

// ----------------- GET experience details by ID --------------------
router.get("/:id", async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) {
      return res
        .status(404)
        .json({ message: "Experience not found" });
    }
    res.json(exp);
  } catch (error) {
    res.status(500).json({
      message: "Error getting experience",
      error: error.message,
    });
  }
});

//  ---------------- Update (reduce) slot availability ----------------------------


router.put("/:id/slots", async (req, res) => {
  try {
    const { date, time } = req.body;

    const exp = await Experience.findById(req.params.id);
    if (!exp) return res.status(404).json({ message: "Experience not found" });

    const dateEntry = exp.availableSlots.find((d) => d.date === date);
    if (!dateEntry)
      return res.status(404).json({ message: "Date not found" });

    const slot = dateEntry.slots.find((s) => s.time === time);
    if (!slot)
      return res.status(404).json({ message: "Time slot not found" });

    if (slot.available <= 0)
      return res.status(400).json({ message: "No slots available" });

    slot.available -= 1;
    await exp.save();

    res.json({ success: true, message: "Slot reduced successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating slot", error: err });
  }
});


// router.put("/:id/slots", async (req, res) => {
//   try {
//     const { time } = req.body;
//     if (!time) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Please provide a time slot" });
//     }

//     const exp = await Experience.findById(req.params.id);
//     if (!exp) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Experience not found" });
//     }

//     const slot = exp.timeSlots.find((s) => s.time === time);
//     if (!slot) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Time slot not found" });
//     }

//     if (slot.available <= 0) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Slot not available" });
//     }

//     // -------------------- Reducing slot count by 1 -----------------
//     slot.available -= 1;
//     await exp.save();

//     res.json({
//       success: true,
//       message: "Slot updated successfully",
//       updatedSlot: slot,
//     });
//   } catch (error) {
//     console.error("Slot update error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong while updating slot",
//     });
//   }
// });

export default router;
