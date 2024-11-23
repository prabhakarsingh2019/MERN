import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { validateData } from "../utils/validData";
import { login } from "../service/userService";
import { Link } from "react-router-dom";

const Login = () => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleBlur = (e) => {
    const newError = validateData(e.target.name, e.target.value);
    setError({
      ...error,
      [e.target.name]: newError,
    });
  };
  const [success, setSuccess] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoader(true);
    const hasError = Object.values(error).some((err) => err !== "");
    if (hasError || Object.values(formData).some((data) => data === "")) {
      setMessage("Please fill all the fields");
      setLoader(false);
      return setSuccess(false);
    }
    try {
      const response = await login(formData);
      setMessage(response.message);
      setSuccess(true);
    } catch (error) {
      setMessage(error.message);
      setSuccess(false);
    } finally {
      setLoader(false);
    }
  };
  const handleDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({
      ...error,
      [e.target.name]: "",
    });
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <div className="mb-5 text-center">
        <h1 className="text-3xl font-semibold text-primary">Login</h1>
      </div>

      <form onSubmit={handleLogin} noValidate>
        <div className="mb-6">
          <label className="block text-primary text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="e.g. johndoe@example.com"
            onChange={handleDataChange}
            onBlur={handleBlur}
            className={`w-full p-3 border rounded-md focus:ring focus:ring-primary focus:outline-none transition ${
              error.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error.email && (
            <p className="text-red-500 text-xs mt-1">{error.email}</p>
          )}
        </div>

        <div className="mb-6 relative">
          <label className="block text-primary text-sm font-medium mb-2">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            placeholder="e.g. password123"
            onChange={handleDataChange}
            onBlur={handleBlur}
            className={`w-full p-3 border rounded-md focus:ring focus:ring-primary focus:outline-none transition ${
              error.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600 focus:outline-none mt-1"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {error.password && (
            <p className="text-red-500 text-xs mt-1">{error.password}</p>
          )}
        </div>
        <div className="mb-4 text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <div>
          <button
            type="submit"
            className={`w-full py-3 bg-primary text-white rounded-lg shadow-md hover:bg-secondary transition-all duration-300 ${
              loader ? "cursor-not-allowed" : "cursor-pointer"
            } flex justify-center items-center`}
            disabled={loader}
          >
            {loader ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>

      {message && (
        <p
          className={`text-center text-xs mt-3 ${
            !success ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}
      <div className="text-center mt-4">
        <p className="text-sm text-primary">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-secondary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
