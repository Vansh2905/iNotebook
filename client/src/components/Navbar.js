import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // check if user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold">iNotebook</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`nav-link ${
                location.pathname === "/" ? "active font-bold underline" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`nav-link ${
                location.pathname === "/about" ? "active font-bold underline" : ""
              }`}
            >
              About
            </Link>

            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-2 py-1 rounded-sm hover:bg-blue-500"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-2 py-1 rounded-sm hover:bg-blue-500"
                >
                  SignUp
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-3 space-y-3">
          <Link
            to="/"
            onClick={closeMenu}
            className="block hover:bg-gray-700 px-3 py-2 rounded"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={closeMenu}
            className="block hover:bg-gray-700 px-3 py-2 rounded"
          >
            About
          </Link>

          {!isLoggedIn ? (
            <div className="flex gap-2">
              <Link
                to="/login"
                onClick={closeMenu}
                className="bg-white text-black px-2 py-1 rounded-sm hover:bg-gray-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={closeMenu}
                className="bg-white text-black px-2 py-1 rounded-sm hover:bg-gray-200"
              >
                SignUp
              </Link>
            </div>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 w-full text-left"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
