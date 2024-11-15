import React, { useContext, useState } from "react";
import { signup } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigateHandler = () => {
    navigate("/login");
  };

  const validPassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return regex.test(password);
  };

  const validEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      return setError({
        firstName: !formData.firstName
          ? 'Please enter your first name (e.g., "John")'
          : "",
        lastName: !formData.lastName
          ? 'Please enter your last name (e.g., "Doe")'
          : "",
        username: !formData.username ? "Please enter a username" : "",
        email: !formData.email
          ? "Please enter a valid email (e.g., example@gmail.com)"
          : "",
        password: !formData.password ? "Please enter a password" : "",
      });
    }
    const checkEmail = validEmail(formData.email);
    const checkPassword = validPassword(formData.password);

    if (!checkEmail || !checkPassword) {
      return setError({
        email: !checkEmail
          ? "Please enter a valid email (e.g., example@gmail.com)"
          : "",
        password: !checkPassword
          ? "Password must be at least 8 characters long, contain a number, a special character, and both uppercase and lowercase letters."
          : "",
      });
    }

    try {
      const response = await signup(formData);
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
      });
      setMessage(response.message);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
      <div className="bg-white shadow-lg rounded-lg px-10 py-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-8 text-blue-700 text-center">
          Signup
        </h2>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              value={formData.firstName}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {error.firstName && (
              <p className="text-red-500 text-sm mt-2">{error.firstName}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              value={formData.lastName}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {error.lastName && (
              <p className="text-red-500 text-sm mt-2">{error.lastName}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={formData.username}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {error.username && (
              <p className="text-red-500 text-sm mt-2">{error.username}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {error.email && (
              <p className="text-red-500 text-sm mt-2">{error.email}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
                className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  error.password ? "ring-red-400 ring-2" : ""
                }`}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-600" />
                ) : (
                  <FaEye className="text-gray-600" />
                )}
              </button>
            </div>
            {error.password && (
              <p className="text-red-500 text-sm mt-2">{error.password}</p>
            )}
          </div>

          {message && (
            <p className="text-center text-red-500 mt-4 text-sm">{message}</p>
          )}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded w-full transition duration-200"
          >
            Signup
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <button
            onClick={navigateHandler}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
