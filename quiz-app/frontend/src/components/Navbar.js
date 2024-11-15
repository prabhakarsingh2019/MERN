import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-white">
            QuizApp
          </Link>

          <div className="hidden md:flex space-x-4">
            <Link
              to="/"
              className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
            >
              Home
            </Link>
            <Link
              to={isLoggedIn ? "/create-quiz" : "/login"}
              className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
            >
              Create Quiz
            </Link>
            {isLoggedIn && (
              <Link
                to="/profile"
                className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                Profile
              </Link>
            )}
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/sign-up"
                  className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <Logout className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-200" />
            )}
          </div>

          {/* Hamburger Icon for smaller screens */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="focus:outline-none focus:ring-2 focus:ring-white"
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

        {isMenuOpen && (
          <div className="md:hidden space-y-1 mt-2 bg-blue-700 rounded-lg p-4 shadow-lg">
            <Link
              to="/"
              className="block text-white hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
            >
              Home
            </Link>
            <Link
              to={isLoggedIn ? "/create-quiz" : "/login"}
              className="block text-white hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
            >
              Create Quiz
            </Link>
            {isLoggedIn && (
              <Link
                to="/profile"
                className="block text-white hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                Profile
              </Link>
            )}
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="block text-white hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/sign-up"
                  className="block text-white hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <Logout className="block text-white hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium transition duration-200" />
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
