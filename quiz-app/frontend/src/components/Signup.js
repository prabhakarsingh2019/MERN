import React, { useState } from "react";
import { signup } from "../services/authServices";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
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
    try {
      const response = await signup(formData);
      setMessage(response.message);
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
          required
          value={formData.firstName}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3"
        />
        <input
          type="text"
          name="lastName"
          placeholder="First Name"
          onChange={handleChange}
          required
          value={formData.lastName}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          value={formData.username}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          value={formData.email}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          value={formData.password}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Signup
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Alredy have an account{" "}
        <button
          onClick={navigateHandler}
          className="text-blue-600 hover:text-blue-800"
        >
          Log in
        </button>
      </p>
      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
};

export default Signup;
