# 🌍 BookIt: Experiences & Slots  
**A full-stack travel booking web app** where users can explore adventure experiences, view available time slots, and book them seamlessly.

---

## 🚀 Live Demo  
🖥️ **Frontend (Vercel):** [https://book-it-experience-slots.vercel.app/](https://book-it-experience-slots.vercel.app/)  
🗄️ **Backend (Render):** [https://bookit-experience-slots.onrender.com](https://bookit-experience-slots.onrender.com)  

---

## 🧩 Project Overview  
**BookIt** is a complete MERN stack application developed as part of an internship assignment.  
It demonstrates the **end-to-end web development process** — from pixel-perfect frontend design to robust backend integration and cloud deployment.

The app allows users to:
- Browse and explore curated adventure experiences.  
- View **real-time available dates and slots** directly from MongoDB.  
- Proceed to checkout, apply **promo codes**, and confirm bookings.  
- Get an instant **booking confirmation** with a unique reference ID.

---

## 🛠️ Tech Stack  

### 🖥️ Frontend  
- ⚛️ **React + TypeScript (Vite)**  
- 🎨 **Tailwind CSS** for a clean, responsive, and modern UI  
- 🔗 **Axios** for API integration  
- 🧭 **React Router DOM** for routing and navigation  

### ⚙️ Backend  
- 🧩 **Node.js + Express.js** for RESTful API  
- 🗄️ **MongoDB (Mongoose)** for database management  
- 🔐 **dotenv** for secure environment variables  

### ☁️ Deployment  
- 🌐 **Frontend:** Vercel  
- 🔥 **Backend:** Render  
- ☁️ **Database:** MongoDB Atlas  

---

## 📚 Key Features  
✅ Fully responsive & mobile-friendly UI  
✅ Dynamic slot management (updates after each booking)  
✅ Promo code validation (e.g., `SAVE10`, `FLAT100`)  
✅ Input & form validation for checkout  
✅ Real-time booking confirmation  
✅ Well-structured, scalable codebase  

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
| `GET` | `/experiences/:id` | Fetch details of a single experience |
| `PUT` | `/experiences/:id/slots` | Update available slots |
| `POST` | `/bookings` | Create a new booking |
| `POST` | `/promo/validate` | Validate promo code |

---

## 🧠 How to Run Locally  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/mohdkabeer-dev/BookIt-Experience-Slots.git
cd BookIt-Experience-Slots

