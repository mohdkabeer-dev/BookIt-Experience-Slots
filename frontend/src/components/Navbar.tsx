import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Search } from "lucide-react";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function Navbar({ search, setSearch }: Props) {
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* ============================= Logo ================================= */}
        <div className="flex items-center gap-2">
          <Link to="/"><img src="/logo3.png" alt="BookIt Logo" className="h-12 w-auto" /></Link>
        </div>

        {/* ========================= Search-Bar ====================================== */}
        <div className="hidden sm:flex items-center">
          <div className="flex w-[300px] bg-[#EDEDED] rounded-md overflow-hidden">
            <input
              type="text"
              placeholder={
                location.pathname === "/" ? "Search experiences" : ""
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 focus:outline-none text-sm placeholder:text-[#727272]"
            />
          </div>

          <button className="ml-3 bg-[#FFD643] text-black font-medium px-4 py-2 rounded-md hover:bg-yellow-300 transition">
            Search
          </button>
        </div>

        {/* =========================== Search Icon for Mobile  ============================ */}
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="sm:hidden bg-[#FFD643] p-2 rounded-md"
        >
          <Search className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* ========================= Search Bar for mobile ================================= */}
      {showSearch && (
        <div className="sm:hidden px-4 pb-3">
          <div className="flex bg-[#EDEDED] rounded-md overflow-hidden">
            <input
              type="text"
              placeholder={
                location.pathname === "/" ? "Search experiences" : ""
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 focus:outline-none text-sm placeholder:text-[#727272]"
            />
            <button className="bg-black text-white font-medium px-4 py-2 hover:bg-gray-800 transition">
              Go
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}


