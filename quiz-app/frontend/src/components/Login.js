import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login } from "../services/authServices";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigateHandler = () => navigate("/sign-up");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    if (!formData.email || !formData.password) {
      setError({
        email: !formData.email ? "Email is required" : "",
        password: !formData.password ? "Password is required" : "",
      });
      return;
    }

    const checkEmail = validEmail(formData.email);
    const checkPassword = validPassword(formData.password);

    if (!checkEmail || !checkPassword) {
      return setError({
        email: !checkEmail ? "Invalid email" : "",
        password: !checkPassword ? "Inavlid password" : "",
      });
    }

    try {
      const response = await login(formData);
      setMessage(response.message);
      setFormData({ email: "", password: "" });
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <h2 className="text-3xl font-semibold mb-8 text-blue-700">Login</h2>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white shadow-lg rounded-lg px-10 py-8 w-full max-w-md"
      >
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            onChange={handleChange}
            value={formData.email}
            className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              error.email ? "ring-red-400 ring-2" : ""
            }`}
          />
          {error.email && (
            <p className="text-red-500 text-sm mt-2">{error.email}</p>
          )}
        </div>

        <div className="mb-6">
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

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded w-full transition duration-200"
        >
          Login
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-600">
        Don't have an account?{" "}
        <button
          onClick={navigateHandler}
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          Sign up
        </button>
      </p>

      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
};

export default Login;
