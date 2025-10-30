import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MoveLeft } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL;


type Slot = {
  time: string;
  available: number;
};

type AvailableSlot = {
  date: string;
  slots: Slot[];
};

type Experience = {
  _id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  price: number;
  availableSlots: AvailableSlot[];
};

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [exp, setExp] = useState<Experience | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (exp && exp.availableSlots?.length > 0 && !selectedDate) {
      setSelectedDate(exp.availableSlots[0].date);
    }
  }, [exp]);

  // ---------- for Fetching data based on User clicked Button using experience id -------------
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/experiences/${id}`)
      .then((res) => {
        setExp(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error loading details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!exp) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Experience not found</p>
      </div>
    );
  }

  const tax = 59;
  const subtotal = exp.price * quantity;
  const total = subtotal + tax;
  const canConfirm = selectedDate && selectedTime;

  // ---------------for Handling Confirm booking ---------------------
  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) return;

    navigate("/checkout", {
      state: {
        experience: exp,
        selectedDate,
        selectedTime,
        quantity,
        total,
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-10">
      {/* =================== Experience data (complete info) ========================== */}
      <div className="lg:col-span-2">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-black font-semibold hover:text-yellow-400 mb-4"
        >
          <MoveLeft className="mr-2" /> Back
        </button>

        <img
          src={exp.image}
          alt={exp.title}
          className="w-full h-[400px] object-cover rounded-lg mb-6"
        />

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {exp.title}
        </h2>
        <p className="text-gray-600 mb-6">
          {exp.description ||
            "Curated small-group experience with certified guides. Safety first with all gear included."}
        </p>

        {/* ================ Choose Date Section ======================== */}
        {/* ================ Choose Date Section ======================== */}
        <div className="mb-6">
          <h3 className="font-medium text-[#161616] mb-2">Choose date</h3>
          <div className="flex flex-wrap gap-2">
            {exp.availableSlots.map((day) => (
              <button
                key={day.date}
                onClick={() => setSelectedDate(day.date)}
                className={`px-4 py-2 rounded text-sm border transition ${selectedDate === day.date
                  ? "bg-[#FFD643] text-[#161616] border-yellow-300"
                  : "text-[#838383] hover:bg-gray-200"
                  }`}
              >
                {new Date(day.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                })}
              </button>
            ))}
          </div>
        </div>

        {/* =============== Choose Time Section ================== */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-800 mb-2">Choose time</h3>
          <div className="flex flex-wrap gap-2">
            {exp.availableSlots
              .find((d) => d.date === selectedDate)
              ?.slots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() =>
                    slot.available > 0 && setSelectedTime(slot.time)
                  }
                  disabled={slot.available === 0}
                  className={`px-4 py-2 rounded text-sm border transition
            ${selectedTime === slot.time
                      ? "border-yellow-300 bg-[#FFD643] text-[#161616]"
                      : "border-gray-300 text-gray-700"
                    }
            ${slot.available === 0
                      ? "bg-[#EEEEEE] text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-100"
                    }`}
                >
                  {slot.time}
                  <span
                    className={`text-xs font-semibold ml-2 ${slot.available === 0 ? "text-[#6A6A6A]" : "text-[#FF4C0A]"
                      }`}
                  >
                    {slot.available === 0
                      ? "Sold out"
                      : `${slot.available} left`}
                  </span>
                </button>
              ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            All times are in IST (GMT +5:30)
          </p>
        </div>

        {/* ==================== About Section ===================== */}
        <div className="mt-6">
          <h3 className="font-medium text-gray-800 mb-2">About</h3>
          <div className="bg-[#EEEEEE] text-gray-600 text-sm px-4 py-3 rounded">
            Scenic routes, trained guides, and safety briefing. Minimum age 10.
          </div>
        </div>
      </div>

      {/* ================== Pricing Section  ================== */}
      <div className="bg-[#EEEEEE] rounded-lg shadow-sm p-6 h-fit">
        <div className="flex justify-between items-center mb-4">
          <p className="text-[#838383]">Starts at</p>
          <h3 className="text-2xl font-semibold text-[#161616]">
            ₹{exp.price}
          </h3>
        </div>

        <div className="flex justify-between items-center mb-3">
          <p className="text-[#838383]">Quantity</p>
          <div className="flex items-center rounded-md">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2 py-1 text-lg font-medium border border-[#C9C9C9] hover:bg-gray-100"
            >
              −
            </button>
            <span className="px-4 py-1 text-gray-700">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-2 py-1 text-lg font-medium border border-[#C9C9C9] hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex justify-between text-[#838383] mb-1">
          <p>Subtotal</p>
          <p className="text-[#161616]">₹{subtotal}</p>
        </div>

        <div className="flex justify-between text-[#838383] mb-4">
          <p>Taxes</p>
          <p className="text-[#161616]">₹{tax}</p>
        </div>

        <hr className="mb-4 bg-[#D9D9D9]" />

        <div className="flex justify-between text-lg font-semibold text-[#161616] mb-4">
          <p>Total</p>
          <p>₹{total}</p>
        </div>

        <button
          onClick={handleConfirm}
          disabled={!canConfirm}
          className={`w-full py-2 rounded-md transition ${canConfirm
            ? "bg-[#FFD643] text-black hover:bg-yellow-300"
            : "bg-[#D7D7D7] text-[#7F7F7F] cursor-not-allowed"
            }`}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}


