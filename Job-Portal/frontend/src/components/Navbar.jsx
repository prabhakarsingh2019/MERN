import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between items-center p-5 bg-primary shadow-lg rounded-b-lg">
        <div>
          <Link to="/" className="text-white text-3xl font-bold">
            <h4>
              Job <span className="text-accent">Finder</span>
            </h4>
          </Link>
        </div>
        <div>
          <ul className="flex space-x-8">
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
        </div>
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="btn-primary text-primary hover:bg-white hover:text-primary px-6 py-2 rounded-lg transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="btn-secondary text-secondary hover:bg-white hover:text-secondary px-6 py-2 rounded-lg transition-all duration-300"
          >
            Signup
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
