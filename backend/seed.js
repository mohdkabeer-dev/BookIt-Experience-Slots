import mongoose from "mongoose";
import dotenv from "dotenv";
import Experience from "./models/experience.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

// Helper function to generate random slots
const generateAvailableSlots = () => {
  const dates = [
    "2025-11-01",
    "2025-11-02",
    "2025-11-03",
    "2025-11-04",
    "2025-11-05",
    "2025-11-06",
  ];

  const times = [
    "08:00 AM",
    "10:00 AM",
    "12:00 PM",
    "02:00 PM",
    "04:00 PM",
  ];

  return dates.map((date) => ({
    date,
    slots: times.map((time) => ({
      time,
      available: Math.floor(Math.random() * 6) + 10, // random 10–15
    })),
  }));
};

// ✅ Your complete data (same as your JSON)
const sampleExperiences = [
  {
    title: "Camping",
    description:
      "Enjoy bonfires, starlit skies, and tent stays amidst the Western Ghats.",
    image:
      "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=format&fit=crop&w=1200&q=80",
    location: "Sakleshpur",
    price: 3000,
    availableSlots: generateAvailableSlots(),
  },
  {
    title: "Cave Exploration",
    description:
      "Explore the ancient rock-cut temples and caves of Badami, Karnataka’s heritage gem.",
    image:
      "https://images.pexels.com/photos/14747543/pexels-photo-14747543.jpeg?auto=format&fit=crop&w=1200&q=80",
    location: "Badami",
    price: 3700,
    availableSlots: generateAvailableSlots(),
  },
  {
    title: "Rock Climbing",
    description:
      "Challenge yourself on world-class granite boulders amidst the ruins of Hampi.",
    image:
      "https://images.unsplash.com/photo-1682872073234-3af7e7c26585?ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    location: "Hampi",
    price: 3800,
    availableSlots: generateAvailableSlots(),
  },
  {
    title: "Jungle Safari",
    description:
      "Experience the thrill of spotting tigers and elephants in Bandipur National Park.",
    image:
      "https://images.unsplash.com/photo-1641883177292-9353e1f7e6ce?ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    location: "Bandipur",
    price: 4600,
    availableSlots: generateAvailableSlots(),
  },
  {
    title: "Wildlife Safari",
    description:
      "Go rafting on the Kali River and enjoy a thrilling forest safari in Dandeli.",
    image:
      "https://images.pexels.com/photos/5118532/pexels-photo-5118532.jpeg?auto=format&fit=crop&w=1200&q=80",
    location: "Dandeli",
    price: 4500,
    availableSlots: generateAvailableSlots(),
  },
  {
    title: "Hot Air Balloon Ride",
    description:
      "Watch the royal city of Mysuru from above in a breathtaking balloon ride.",
    image:
      "https://images.unsplash.com/photo-1662930876459-03c895e4425d?ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    location: "Mysuru",
    price: 7500,
    availableSlots: generateAvailableSlots(),
  },
  {
    title: "Scuba Diving",
    description:
      "Explore the underwater beauty of Netrani Island with certified dive instructors.",
    image:
      "https://images.pexels.com/photos/28584677/pexels-photo-28584677.jpeg?auto=format&fit=crop&w=1200&q=80",
    location: "Murudeshwar",
    price: 5800,
    availableSlots: generateAvailableSlots(),
  },
  {
    title: "Waterfall Trek",
    description:
      "Trek through misty forests and discover hidden waterfalls in Coorg’s hills.",
    image:
      "https://images.pexels.com/photos/2461563/pexels-photo-2461563.jpeg?auto=format&fit=crop&w=1200&q=80",
    location: "Coorg",
    price: 3500,
    availableSlots: generateAvailableSlots(),
  },
  {
    title: "Coffee Estate Stay",
    description:
      "Relax in a peaceful coffee estate stay surrounded by lush greenery and hills.",
    image:
      "https://images.unsplash.com/photo-1647170106204-8e51abcfca04?ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    location: "Chikmagalur",
    price: 4200,
    availableSlots: generateAvailableSlots(),
  },
  {
    title: "Kayaking",
    description:
      "Paddle through serene backwaters and mangroves in Kundapura’s coastal beauty.",
    image:
      "https://images.unsplash.com/photo-1480480565647-1c4385c7c0bf?ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    location: "Kundapura",
    price: 3200,
    availableSlots: generateAvailableSlots(),
  },
  {
    title: "Night Trek",
    description:
      "Trek under the stars to witness a stunning sunrise from Skandagiri hilltop.",
    image:
      "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=format&fit=crop&w=1200&q=80",
    location: "Skandagiri",
    price: 2800,
    availableSlots: generateAvailableSlots(),
  },
  {
    title: "Surfing",
    description:
      "Ride the Arabian Sea waves and enjoy peaceful beach vibes in Gokarna.",
    image:
      "https://images.unsplash.com/photo-1455729552865-3658a5d39692?ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    location: "Gokarna",
    price: 4200,
    availableSlots: generateAvailableSlots(),
  },
];

// ✅ SEED FUNCTION
const seedData = async () => {
  try {
    await Experience.deleteMany();
    await Experience.insertMany(sampleExperiences);
    console.log("✅ Database seeded successfully with random available slots!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedData();
