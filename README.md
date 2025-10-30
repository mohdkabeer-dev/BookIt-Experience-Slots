# 🌍 BookIt: Experiences & Slots  
**A full-stack travel booking web app** where users can explore adventure experiences, view available time slots, and book them seamlessly.


## 🚀 Live Demo  
🖥️ **Frontend (Vercel)** →[ [https://bookit-experience-slots.vercel.app](https://bookit-experience-slots.vercel.app)]
🗄️ **Backend (Render)** → [https://bookit-experience-slots.onrender.com](https://bookit-experience-slots.onrender.com)  

---

## 🧩 Project Overview  
BookIt is a full-stack application built as part of an internship assignment to demonstrate real-world development workflow — from frontend design to backend integration and database management.

The app allows users to:
- Browse and explore curated travel experiences.  
- View **available dates and slots** dynamically from MongoDB.  
- Proceed to checkout, apply **promo codes**, and confirm bookings.  
- View **booking confirmation** with reference ID and details.

---

## 🛠️ Tech Stack  

### 🖥️ Frontend  
- **React + TypeScript (Vite)**  
- **TailwindCSS** for clean and responsive UI  
- **Axios** for API calls  
- **React Router DOM** for navigation  

### ⚙️ Backend  
- **Node.js + Express.js**  
- **MongoDB (Mongoose)** for data persistence  
- **dotenv** for environment variables  

### ☁️ Deployment  
- **Frontend:** Vercel  
- **Backend:** Render  
- **Database:** MongoDB Atlas  

---

## 📚 Features  
✅ Responsive and mobile-friendly UI  
✅ Real-time slot management (available slots update on booking)  
✅ Promo code validation (e.g. `SAVE10`, `FLAT100`)  
✅ Form validation for user details  
✅ Loading and success feedback states  
✅ Organized code structure following clean API architecture  

---

## 🧱 Folder Structure  

BookIt-Experience-Slots/
├── backend/
│ ├── config/
│ ├── models/
│ ├── routes/
│ ├── seed.js
│ ├── server.js
│ └── .env
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── App.tsx
│ │ └── main.tsx
│ └── index.html
└── README.md


---

## ⚡ API Endpoints  

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/experiences` | Fetch all experiences |
| `GET` | `/experiences/:id` | Fetch single experience details |
| `PUT` | `/experiences/:id/slots` | Update slot availability |
| `POST` | `/bookings` | Create a booking |
| `POST` | `/promo/validate` | Validate promo code |

---

## 🧠 How to Run Locally  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/mohdkabeer-dev/BookIt-Experience-Slots.git
cd BookIt-Experience-Slots

