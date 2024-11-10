import React, { useContext, useState } from "react";
import { login } from "../services/authServices";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      setMessage(response.message);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      setMessage(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-1/2"
      >
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
        Don't have account{" "}
        <Link to="sign-up" className="text-blue-600 hover:text-blue-800">
          Sign up
        </Link>
      </p>
      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
};
export default Login;
