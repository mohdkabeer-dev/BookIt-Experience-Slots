import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  location: String,
  price: Number,
  availableSlots: [
    {
      date: String, 
      slots: [
        {
          time: String, 
          available: Number, 
        },
      ],
    },
  ],
});

const Experience = mongoose.model("Experience", experienceSchema);
export default Experience;
