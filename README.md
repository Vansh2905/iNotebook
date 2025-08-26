# 📓 iNotebook

iNotebook is a **MERN stack** (MongoDB, Express.js, React.js, Node.js) web application that allows users to securely create, manage, and store their notes in the cloud.  
It includes **authentication & authorization** so that each user's notes remain private.

---

## 🚀 Features
- 🔐 User authentication (JWT-based login/signup)
- ✍️ Create, edit, and delete notes
- 📂 Store notes securely in MongoDB
- 🖥️ Responsive UI with React + TailwindCSS
- 🌐 Protected routes for logged-in users
- ⚡ REST API with Express.js backend

---

## 🛠️ Tech Stack
- **Frontend**: React.js, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **Version Control**: Git & GitHub

---

## 📂 Project Structure
iNotebook/
│── backend/ # Express + MongoDB API
│ ├── routes/ # Auth & notes routes
│ ├── models/ # MongoDB models
│ ├── middleware/ # Authentication middleware
│ └── server.js # Backend entry point
│
│── frontend/ # React client app
│ ├── src/
│ │ ├── components/ # Reusable components
│ │ ├── Context/ # State management (Notes, Auth)
│ │ ├── pages/ # App pages (Home, Login, Signup)
│ │ └── App.js
│ └── package.json
│
└── README.md

yaml
Copy
Edit

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Vansh2905/inotebook.git
cd inotebook
2️⃣ Backend Setup
bash
Copy
Edit
cd backend
npm install
Create a .env file inside backend/:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
Run the backend:

bash
Copy
Edit
npm start
3️⃣ Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm start
The frontend will start on http://localhost:3000
The backend will run on http://localhost:5000

🧪 API Endpoints
Auth Routes
POST /api/auth/createuser → Register new user

POST /api/auth/login → Authenticate user

POST /api/auth/getuser → Get logged-in user details (protected)

Notes Routes (Protected)
GET /api/notes/fetchallnotes → Get all user notes

POST /api/notes/addnote → Add new note

PUT /api/notes/updatenote/:id → Update note

DELETE /api/notes/deletenote/:id → Delete note


🚀 Deployment
You can deploy:

Frontend → Vercel/Netlify

Backend → Render/Heroku

Database → MongoDB Atlas
🤝 Contributing
Pull requests are welcome!
For major changes, please open an issue first to discuss what you’d like to change.

📜 License
This project is licensed under the MIT License.

👨‍💻 Author
Vansh Ahluwalia
Made with ❤️ using the MERN stack.
