import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const API_BASE_URL = import.meta.env.VITE_API_URL;


type Experience = {
  _id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  price: number;
};

type Props = {
  search: string;
};

export default function Home({ search }: Props) {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  //------------------- for Fetching experiences from backend -----------------
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/experiences`)
      .then((res) => {
        setExperiences(res.data);
      })
      .catch((err) => {
        console.log("Error fetching experiences:", err);
      });
  }, []);

  // ------------------------ for Filtering based on search text ---------------------
  const filtered = experiences.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#F9F9F9] min-h-screen pt-12">
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="bg-[#F0F0F0] rounded-[12px] shadow-md overflow-hidden hover:shadow-lg transition-all"
            >
              {/* ------------------ Data for each card insert Here -------------------- */}
              <div className="relative w-full h-[170px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-[#161616] text-lg">
                    {item.title}
                  </h3>
                  <span className="bg-[#D6D6D6] text-[#161616] text-sm px-2 py-1 rounded-[4px]">
                    {item.location}
                  </span>
                </div>

                <p className="text-[#6c6c6c] text-sm my-4">
                  Curated small-group experience. Certified guide. Safety first
                  with gear included.
                </p>

                <div className="flex items-center justify-between">
                  <p className="text-[#161616] text-sm">
                    From{" "}
                    <span className="font-bold text-lg">
                      ₹{item.price}
                    </span>
                  </p>

                  <Link to={`/details/${item._id}`}>
                    <button className="bg-[#FFD643] text-black text-sm font-medium px-2 py-1 rounded hover:bg-yellow-300 transition">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-12">
            No experiences found.
          </p>
        )}
      </section>
    </div>
  );
}


