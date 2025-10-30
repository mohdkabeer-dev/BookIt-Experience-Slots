import express from "express";
const router = express.Router();

// --------------------- Sample PROMOCODE -----------------------

const promoCodes = [
  { code: "SAVE10%", type: "percent", value: 10 },
  { code: "FLAT100", type: "flat", value: 100 },
];

// ------------------ Validation Route for PROMOCODES ------------------------

router.post("/validate", (req, res) => {
  const { code, subtotal } = req.body;


  if (!code || !subtotal) {
    return res.status(400).json({
      success: false,
      message: "Please provide promo code and subtotal",
    });
  }

  const promo = promoCodes.find(
    (p) => p.code.toUpperCase() === code.toUpperCase()
  );

  if (!promo) {
    return res.status(404).json({
      success: false,
      message: "Invalid promo code",
    });
  }

  // ------------  DISCOUNT calculation -------------------

  let discount = 0;
  if (promo.type === "percent") {
    discount = (subtotal * promo.value) / 100;
  } else if (promo.type === "flat") {
    discount = promo.value;
  }


  res.json({
    success: true,
    message: "Promo applied successfully",
    discount,
    finalTotal: subtotal - discount,
  });
});

export default router;
