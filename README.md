# MERN Music Player (Synthesia)

A full-stack web application for searching, playing, and managing music, built with **React**, **Redux Toolkit**, **Node.js**, **Express**, and **MongoDB**. The application integrates with the **Jamendo API** for music catalog browsing and **ImageKit** for profile image management.

---

## Features

- **Music Catalog & Streaming:**
  - Browse top tracks fetched dynamically from the Jamendo API.
  - Search tracks by name, artist, or tags.
  - Audio playback controls: play, pause, next, previous, progress seeking, and volume control.
- **User Authentication:**
  - User registration (signup) and login powered by JWT authentication and bcrypt password hashing.
  - Consistent security responses to prevent email enumeration attacks.
  - Session restoration on page refresh.
- **Profile Management:**
  - User profile page to update display name, email address, and avatar image.
  - Avatar image uploading with client-side validation (max 5MB, image types only) and ImageKit integration.
- **Favourites & Persistence:**
  - Toggle track favourites with real-time UI updates.
  - Persistent user favourites stored in MongoDB across sessions.
- **Password Recovery UI:**
  - Password recovery and reset interface (token single-use & SHA-256 hashed storage).

---

## Tech Stack

### Frontend
- **Framework:** React 19 + Vite
- **State Management:** Redux Toolkit & React-Redux
- **Routing:** React Router v7
- **Styling:** CSS3 & Tailwind CSS
- **Icons:** React Icons

### Backend
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express v5
- **Database:** MongoDB & Mongoose ORM
- **Authentication:** JSON Web Tokens (jsonwebtoken) & bcrypt
- **External APIs & Services:** Jamendo API (Music), ImageKit (Avatars), Nodemailer

---

## Project Structure

```text
musicplayersavi-master/
├── backend/                # Express API Server
│   ├── config/             # DB & ImageKit configuration
│   ├── controllers/        # Request handlers (auth, songs)
│   ├── middleware/         # Auth verification middleware
│   ├── models/             # Mongoose schemas (User)
│   ├── routes/             # API endpoints (/api/auth, /api/song)
│   └── utils/              # Helper utilities (email sender)
├── frontend/               # React Single-Page Application
│   ├── public/             # Static assets
│   └── src/
│       ├── components/     # UI components (auth, player, layout)
│       ├── css/            # Modular CSS files
│       ├── pages/          # Page components (Homepage, EditProfile, etc.)
│       └── redux/          # Redux slices (authSlice, uiSlice)
└── README.md               # Project Documentation
```

---

## Prerequisites

Before running the project locally, ensure you have:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MongoDB** running locally (or a MongoDB Atlas connection string)

---

## Environment Configuration

### Backend (`backend/.env`)
Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/musicplayer
JWT_SECRET=your_development_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173

# Optional: Email Service
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_mailtrap_user
MAILTRAP_PASS=your_mailtrap_password

# Optional: ImageKit Service
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

### Frontend (`frontend/.env`)
Create a `.env` file inside the `frontend/` directory:

```env
VITE_BASE_URL=http://localhost:5000
```

> **Note:** Never commit `.env` files to version control. Both `.env` paths are listed in `.gitignore`.

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/savi0706/musicplayersavi.git
cd musicplayersavi
```

### 2. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### 3. Start Local Servers

**Run Backend (Port 5000):**
```bash
cd backend
npm run dev
```

**Run Frontend (Port 5173):**
```bash
cd frontend
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## API Endpoints Overview

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Register a new user | No |
| `POST` | `/api/auth/login` | Authenticate user and issue JWT | No |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | Yes |
| `PUT` | `/api/auth/edit-profile` | Update profile details / avatar | Yes |
| `POST` | `/api/auth/forgot-password` | Request password reset | No |
| `POST` | `/api/auth/reset-password/:token` | Reset password using token | No |
| `GET` | `/api/song` | Fetch top tracks from Jamendo API | No |
| `GET` | `/api/song/playlistByTag/:tag` | Fetch playlist by genre tag | No |
| `POST` | `/api/song/favourite` | Toggle track favourite status | Yes |
| `GET` | `/api/song/favourites` | Fetch user's favourite tracks | Yes |

---

## Scripts & Checks

- **Linting:** Run `npm run lint` in `frontend/` to run ESLint checks.
- **Production Build:** Run `npm run build` in `frontend/` to test Vite production bundling.

---

## License

This project is open source and available under the [ISC License](LICENSE).
