# ✈️ Tour Guide Booking System

Modern web app to discover tours, book experiences, and get smart recommendations via a lightweight chatbot.


## 🌟 Highlights
- **Sleek UI** powered by React, Bootstrap, and iconography
- **State management** with Redux Toolkit
- **Routing** via React Router v6
- **Media carousels** with React Slick
- **Smart suggestions** via a simple Flask-based chatbot API
- **API-friendly** data models for Tours, Users, and Reviews (MongoDB-ready)


## 🧱 Tech Stack
- **Frontend:** Create React App + CRACO, React 18, Redux Toolkit, React Router v6, Axios, Bootstrap, Reactstrap, React Slick, Lucide icons
- **Backend (models present):** Node.js + Mongoose models for `Tour`, `User`, `Review`
- **Chatbot:** Python, Flask, Flask-CORS


## 📁 Project Structure
```
TOUR GUIDE BOOKING SYSTEM/
├─ tour-management/
│  ├─ frontend/        # React app (CRA + CRACO)
│  ├─ backend/         # Mongoose models (API scaffolding placeholder)
│  └─ Backend_2/       # Flask chatbot API (Python)
└─ README.md
```


## 🚀 Quick Start

### 1) Frontend (React)
```bash
# From: tour-management/frontend
npm install
npm start
# App runs at http://localhost:3000
```

Available scripts:
- `npm start` – dev server
- `npm run build` – production build
- `npm test` – tests (CRA)


### 2) Chatbot API (Flask)
```bash
# From: tour-management/Backend_2
pip install flask flask-cors
python chatbot.py
# Chatbot endpoint: POST http://127.0.0.1:5000/chatbot
```
Request body example:
```json
{
  "message": "recommend",
  "tours": [{ "title": "Paris Highlights", "city": "Paris", "price": 299, "avgRating": 4.9 }],
  "guideData": [{ "name": "Akira", "country": "Japan", "rating": 4.8 }]
}
```

Response example:
```json
{ "reply": "Here are some top tours: ..." }
```


### 3) Backend API (Node/Mongo – placeholder)
The project includes Mongoose models in `tour-management/backend/models` for:
- `Tour` – title, city, address, distance, photo, desc, price, maxGroupSize, reviews, featured
- `User` – username, email, password, photo, role
- `Review` – model present (see codebase)

You can wire these into an Express server with MongoDB. Example tasks:
- Create an Express app with routes for `/api/tours`, `/api/users`, `/api/reviews`
- Connect to MongoDB via Mongoose
- Protect routes with JWT & roles as needed


## 🧩 Key Packages (Frontend)
- `@reduxjs/toolkit` – state management
- `react-router-dom` – routing
- `axios` – HTTP requests
- `bootstrap`, `reactstrap` – UI components
- `react-slick`, `slick-carousel` – carousels
- `lucide-react`, `react-icons`, `remixicon` – icons
- `@craco/craco` – config overrides for CRA


## 🔧 Configuration
- Frontend uses CRACO (`craco.config.js`) to customize CRA behavior
- Browser targets set via `browserslist` in `package.json`


## 📸 Screenshots
Add your screenshots/GIFs here to showcase the UI.
- Home page
- Tour details
- Booking flow
- Chatbot assistant


## 🧪 Testing
- CRA testing setup with `@testing-library/*`
- Run `npm test` in `frontend`


## 🛡️ Notes & Tips
- Keep the Flask chatbot running while testing tour/guide suggestions
- If you add a Node API, configure CORS and align ports with the frontend
- Prefer environment variables for secrets and base URLs


## 🗺️ Roadmap
- Full Express API with auth and bookings
- Admin dashboard for tours/guides
- Payment integration
- Persistent chatbot memory and NLP upgrades


## 🤝 Contributing
1. Fork
2. Create a feature branch
3. Commit with clear messages
4. Open a PR



