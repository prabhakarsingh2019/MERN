import React, { useContext, useState } from "react";
import { signup } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

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

  const navigateHandler = () => {
    navigate("/login");
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

        <form onSubmit={handleSubmit} className="space-y-6">
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
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
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
