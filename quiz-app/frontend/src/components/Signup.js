import React, { useContext, useState } from "react";
import { signup } from "../services/authServices";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

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
      setMessage("Please fill in all fields");
      return;
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6">Signup</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-1/2"
      >
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          value={formData.firstName}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          value={formData.lastName}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={formData.username}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3"
        />
        {message && (
          <p className="text-center text-red-500 mt-4 text-1xl">{message}</p>
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded"
        >
          Signup
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button
          onClick={navigateHandler}
          className="text-blue-600 hover:text-blue-800"
        >
          Log in
        </button>
      </p>
    </div>
  );
};

export default Signup;
