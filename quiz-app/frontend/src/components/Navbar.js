import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const token = localStorage.getItem("authToken");
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">
              QuizApp
            </Link>
          </div>

          {/* Links for larger screens */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to={isLoggedIn ? "/create-quiz" : "/login"}
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Create Quiz
            </Link>
            <Link
              to={isLoggedIn ? "/profile" : "/login"}
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Profile
            </Link>
            {!token && (
              <>
                <Link
                  to="/login"
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/sign-up"
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign up
                </Link>
              </>
            )}

            {token && (
              <>
                <Logout className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium" />
              </>
            )}
          </div>

          {/* Hamburger Icon for smaller screens */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Dropdown Menu for smaller screens */}
        {isMenuOpen && (
          <div className="md:hidden space-y-1 mt-2">
            <Link
              to="/"
              className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/quiz"
              className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Quizzes
            </Link>
            <Link
              to="/profile"
              className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Profile
            </Link>
            <Link
              to="/login"
              className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/sign-up"
              className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
