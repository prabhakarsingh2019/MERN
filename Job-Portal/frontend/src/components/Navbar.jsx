import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { UserStatusContext } from "../context/UserStatus";
import Logout from "./Logout";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { Components, setComponent } = useContext(AppContext);
  const { userStatus } = useContext(UserStatusContext);

  return (
    <div>
      <nav className="p-5 bg-primary shadow-lg rounded-b-lg">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link to="/" className="text-white text-2xl md:text-3xl font-bold">
              <h4>
                Job<span className="text-accent">Finder</span>
              </h4>
            </Link>
          </div>

          {/* Hamburger Menu Button for Small Screens */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white text-2xl md:hidden focus:outline-none"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Navbar Links (Hidden on small screens, shown on medium+) */}
          <ul className="hidden md:flex space-x-8">
            <li>
              <Link
                to="/"
                className="text-white hover:bg-secondary hover:text-white py-2 px-4 rounded-lg transition-all duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-white hover:bg-secondary hover:text-white py-2 px-4 rounded-lg transition-all duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="text-white hover:bg-secondary hover:text-white py-2 px-4 rounded-lg transition-all duration-300"
              >
                Profile
              </Link>
            </li>
          </ul>

          {/* Buttons (Hidden on small screens, shown on medium+) */}
          {!userStatus ? (
            <div className="hidden md:flex space-x-4">
              <button
                className="btn-primary text-primary hover:bg-white hover:text-primary px-6 py-2 rounded-lg transition-all duration-300"
                onClick={() => setComponent(Components.LOGIN)}
              >
                Login
              </button>
              <button
                className="btn-secondary text-secondary hover:bg-white hover:text-secondary px-6 py-2 rounded-lg transition-all duration-300"
                onClick={() => setComponent(Components.SIGNUP)}
              >
                Signup
              </button>
            </div>
          ) : (
            <div className="hidden md:flex space-x-4">
              <Logout />
            </div>
          )}
        </div>

        {/* Dropdown Menu for Small Screens */}
        {isMenuOpen && (
          <div className="mt-3 md:hidden">
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="block text-white hover:bg-secondary hover:text-white py-2 px-4 rounded-lg transition-all duration-300 mt-2"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block text-white hover:bg-secondary hover:text-white py-2 px-4 rounded-lg transition-all duration-300 mt-2"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="block text-white hover:bg-secondary hover:text-white py-2 px-4 rounded-lg transition-all duration-300 mt-2"
                >
                  Profile
                </Link>
              </li>
              {!userStatus ? (
                <>
                  <li>
                    <button
                      className=" w-[100px] btn-primary block text-primary hover:bg-white hover:text-primary px-4 py-2 rounded-lg transition-all duration-300 mt-2"
                      onClick={() => setComponent(Components.LOGIN)}
                    >
                      Login
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-[100px] btn-secondary block  text-secondary hover:bg-white hover:text-secondary px-4 py-2 rounded-lg transition-all duration-300 mt-2"
                      onClick={() => setComponent(Components.SIGNUP)}
                    >
                      Signup
                    </button>
                  </li>
                </>
              ) : (
                <Logout />
              )}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
