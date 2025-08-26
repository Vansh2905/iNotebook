import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/login";
import SignUp from "./components/signUp";
import Navbar from "./components/Navbar";
import NoteState from "./Context/notes/notestate";
import { PrivateRoute } from "./components/PrivateRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              {/* Protect Home route */}
              <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </GoogleOAuthProvider>
  );
}

export default App;
