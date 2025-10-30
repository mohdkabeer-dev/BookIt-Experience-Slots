import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { MoveLeft } from "lucide-react";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const { experience, selectedDate, selectedTime, quantity, total } =
    location.state || {};

  // ------------------- form fields ----------------------
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [promoCode, setPromoCode] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);

  // ----------------------- promo code fields --------------------------
  const [discount, setDiscount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [isApplying, setIsApplying] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  //  ---------------------  charges calculation --------------------
  const tax = 59;
  const subtotal = (experience?.price || 0) * (quantity || 1);
  const finalTotal = subtotal - discount + tax;

  // ---------------------- APPLY PROMO CODE handling ------------------------
  const handleApplyPromo = async () => {
    if (!promoCode) {
      setMessage("Please enter a promo code");
      return;
    }

    setIsApplying(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/promo/validate`, {
        code: promoCode,
        subtotal: subtotal,
      });

      if (response.data.success) {
        setDiscount(response.data.discount);
        setMessage("Promo applied successfully!");
      } else {
        setDiscount(0);
        setMessage("Invalid promo code!");
      }
    } catch (error) {
      console.log("Promo error:", error);
      setMessage("Error while checking promo code");
    }

    setIsApplying(false);
  };

  // -------------------- PAYMENT HANDLING ---------------------------- 
  const handlePayConfirm = async () => {
    if (isProcessing) return;

    setIsProcessing(true);

    // -------------------- input validation CHECK------------------
    if (!fullName || !email || !checked) {
      alert("Please fill all details and agree to the terms");
      setIsProcessing(false);
      return;
    }

    if (!experience?._id || !selectedDate || !selectedTime) {
      alert("Booking details missing. Try again.");
      setIsProcessing(false);
      return;
    }

    try {
      const refId = Math.random().toString(36).substring(2, 8).toUpperCase();

      // ------------------ for saving booking -------------------------------
      await axios.post(`${API_BASE_URL}/bookings`, {
        name: fullName,
        email: email,
        experienceId: experience._id,
        experienceName: experience.title || experience.name,
        selectedDate,
        selectedTime,
        quantity,
        total: finalTotal,
        refId,
      });

      //  ----------------------- redirecting to /RESULT page ---------------------------
      navigate("/result", {
        state: {
          booking: {
            refId,
            name: fullName,
            experienceName: experience.title || experience.name,
            selectedDate,
            selectedTime,
            total: finalTotal,
          },
        },
      });
    } catch (err) {
      console.log("Error during booking:", err);
      alert("Something went wrong! Please try again.");
    }

    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-4">
      {/* ---------------- back button ------------------- */}
      <div className="w-full max-w-5xl mb-6 flex items-center text-gray-600 text-sm">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-base font-semibold hover:text-yellow-300"
        >
          <MoveLeft className="mr-2" />
          Checkout
        </button>
      </div>

        {/* ------------------- form for user details / LEFT side  ------------------------ */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">

        <div className="flex-1 bg-gray-100 p-6 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your name"
                className="w-full p-2 border rounded bg-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full p-2 border rounded bg-gray-200"
              />
            </div>
          </div>

          {/* ------------------ promo section ---------------------- */}
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <input
              type="text"
              placeholder="Promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full p-2 border rounded bg-gray-200"
            />
            <button
              onClick={handleApplyPromo}
              disabled={isApplying}
              className={`px-4 py-2 text-white rounded ${isApplying ? "bg-gray-400" : "bg-black hover:bg-gray-800"
                }`}
            >
              {isApplying ? "..." : "Apply"}
            </button>
          </div>

          {message && (
            <p
              className={`text-sm mb-2 ${message.includes("success") ? "text-green-600" : "text-red-500"
                }`}
            >
              {message}
            </p>
          )}

          <label className="flex items-center text-sm text-gray-700 mt-3">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
              className="mr-2 h-6 w-4 accent-black"
            />
            I agree to the terms and safety policy
          </label>
        </div>

        {/* ------------   FINAL payment & Confirm Details Section ---------------- */}
        <div className="w-full md:w-80 bg-gray-100 p-6 rounded-lg">
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Experience</span>
              <span>{experience?.title || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span>Date</span>
              <span>{selectedDate || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span>Time</span>
              <span>{selectedTime || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span>Qty</span>
              <span>{quantity || 1}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>₹{tax}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-600">-₹{discount}</span>
              </div>
            )}
            <hr className="my-3" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{finalTotal}</span>
            </div>
          </div>

          <button
            onClick={handlePayConfirm}
            disabled={!checked || isProcessing}
            className={`w-full mt-6 py-2 rounded font-medium ${checked ? "bg-[#FFD643] hover:bg-yellow-300" : "bg-gray-300"
              }`}
          >
            {isProcessing ? "Processing..." : "Pay and Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

