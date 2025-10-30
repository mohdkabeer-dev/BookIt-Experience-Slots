
import { useLocation, useNavigate } from "react-router-dom";


export default function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();


  const booking = location.state?.booking;
  const refId = booking?.refId || "HUF568SO"; 

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] bg-white">

      <div className="bg-green-500 rounded-full p-4 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="white"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-1">
        Booking Confirmed
      </h2>
      <p className="text-gray-500 text-sm mb-8">Ref ID: {refId}</p>

      <button
        onClick={() => navigate("/")}
        className="bg-gray-200 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-300 transition"
      >
        Back to Home
      </button>
    </div>
  );
}
