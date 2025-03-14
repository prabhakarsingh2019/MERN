import { useContext, useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { validateData } from "../utils/validData";
import { signup } from "../service/userService";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { UserStatusContext } from "../context/UserStatus";
import Alert from "../utils/Alert";

const Signup = () => {
  const { Components, setComponent } = useContext(AppContext);
  const { setUserStatus } = useContext(UserStatusContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "student",
    username: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const [error, setError] = useState({
    fullName: "",
    email: "",
    password: "",
    username: "",
  });
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({
      ...error,
      [e.target.name]: "",
    });
  };

  const handleBlur = (e) => {
    const error = validateData(e.target.name, e.target.value);
    setError((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: error,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const hasErrors = Object.values(error).some((err) => err !== "");
    if (hasErrors || Object.values(formData).some((data) => data === "")) {
      setLoader(false);
      setShowAlert(true);
      return setAlert({
        message: "Please fill all the fields",
        type: "error",
      });
    }
    try {
      const response = await signup(formData);
      setAlert({
        message: response.message,
        type: "success",
      });
      setShowAlert(true);
      setUserStatus(true);
      setComponent(Components.DEFAULT);
      setTimeout(() => {
        navigate("/verify-email");
      }, 1500);
    } catch (error) {
      setShowAlert(true);
      setAlert({
        message: error.message,
        type: "error",
      });
    } finally {
      setLoader(false);
    }
  };

  return (
    <div
      className="max-w-md w-full m-10 
     m-auto sm:max-w-sm px-4 py-6 bg-white rounded-lg shadow-md "
    >
      {showAlert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="text-center mb-4">
        <h3 className="text-xl md:text-2xl font-semibold text-primary">
          Sign Up
        </h3>
      </div>
      <form onSubmit={handleFormSubmit} noValidate>
        <div className="mb-3">
          <label className="block text-primary text-sm font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            placeholder="e.g. John Doe"
            onChange={handleDataChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded-md focus:ring focus:ring-primary focus:outline-none transition ${
              error.fullName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error.fullName && (
            <p className="text-red-500 text-xs mt-1">{error.fullName}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="block text-primary text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="e.g. johndoe@example.com"
            onChange={handleDataChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded-md focus:ring focus:ring-primary focus:outline-none transition ${
              error.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error.email && (
            <p className="text-red-500 text-xs mt-1">{error.email}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="block text-primary text-sm font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            placeholder="e.g. Johndoe"
            onChange={handleDataChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded-md focus:ring focus:ring-primary focus:outline-none transition ${
              error.username ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error.username && (
            <p className="text-red-500 text-xs mt-1">{error.username}</p>
          )}
        </div>

        <div className="mb-3">
          <div className="relative">
            <label className="block text-primary text-sm font-medium mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              placeholder="e.g. password123"
              onChange={handleDataChange}
              onBlur={handleBlur}
              className={`w-full p-2 border rounded-md focus:ring focus:ring-primary focus:outline-none transition ${
                error.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 focus:outline-none mt-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {error.password && (
            <p className="text-red-500 text-xs mt-1">{error.password}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="block text-primary text-sm font-medium mb-1">
            Role
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="role"
                value="student"
                checked={formData.role === "student"}
                onChange={handleDataChange}
                onBlur={handleBlur}
                className="hidden"
              />
              <span
                className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                  formData.role === "student"
                    ? "border-primary"
                    : "border-gray-300"
                }`}
              >
                {formData.role === "student" && (
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                )}
              </span>
              <span className="ml-2 text-sm text-primary">Student</span>
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="role"
                value="recruiter"
                checked={formData.role === "recruiter"}
                onChange={handleDataChange}
                onBlur={handleBlur}
                className="hidden"
              />
              <span
                className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                  formData.role === "recruiter"
                    ? "border-primary"
                    : "border-gray-300"
                }`}
              >
                {formData.role === "recruiter" && (
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                )}
              </span>
              <span className="ml-2 text-sm text-primary">Recruiter</span>
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className={`w-full py-2 bg-primary text-white rounded-md shadow-sm hover:bg-secondary transition-all duration-300 ${
              loader ? "cursor-not-allowed" : "cursor-pointer"
            } flex justify-center items-center`}
            disabled={loader}
          >
            {loader ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
      </form>

      {alert.message && (
        <p
          className={`text-center text-xs mt-2 ${
            alert.type === "error" ? "text-red-500" : "text-green-500"
          }`}
        >
          {alert.message}
        </p>
      )}
      <div className="text-center mt-3">
        <p className="text-sm text-primary">
          Already have an account?{" "}
          <button
            className="font-semibold text-secondary hover:underline"
            onClick={() => setComponent(Components.LOGIN)}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
