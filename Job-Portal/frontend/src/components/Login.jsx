import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { validateData } from "../utils/validData";
import { login } from "../service/userService";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { UserStatusContext } from "../context/UserStatus";
import Alert from "../utils/Alert";

const Login = () => {
  const { Components, setComponent } = useContext(AppContext);
  const { setUserStatus } = useContext(UserStatusContext);
  const [loader, setLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleBlur = (e) => {
    const newError = validateData(e.target.name, e.target.value);
    setError({
      ...error,
      [e.target.name]: newError,
    });
  };

  const navigate = useNavigate("/");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoader(true);
    const hasError = Object.values(error).some((err) => err !== "");
    if (hasError || Object.values(formData).some((data) => data === "")) {
      setLoader(false);
      setShowAlert(true);
      return setAlert({
        message: "Please fill all the fields before login",
        type: "error",
      });
    }
    try {
      const response = await login(formData);
      setAlert({
        message: response.message,
        type: "success",
      });
      setUserStatus(true);
      setComponent(Components.DEFAULT);
      navigate("/");
    } catch (error) {
      setAlert({
        message: error.message,
        type: "error",
      });
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
    <div className="max-w-md w-full m-10 m-auto sm:max-w-sm px-4 py-6 bg-white rounded-lg shadow-md ">
      {showAlert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-semibold text-primary">Login</h1>
      </div>

      <form onSubmit={handleLogin} noValidate>
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

        <div className="mb-3 ">
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

        <div className="mb-3 text-right">
          <button
            type="button"
            className="text-sm text-primary hover:underline"
            onClick={() => setComponent(Components.FORGET_PASSWORD)}
          >
            Forgot Password?
          </button>
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
              "Login"
            )}
          </button>
        </div>
      </form>

      {alert.message && (
        <p
          className={`text-center text-xs mt-2 ${
            alert.type !== "success" ? "text-red-500" : "text-green-500"
          }`}
        >
          {alert.message}
        </p>
      )}
      <div className="text-center mt-3">
        <p className="text-sm text-primary">
          Don't have an account?{" "}
          <button
            type="button"
            className="font-semibold text-secondary hover:underline"
            onClick={() => setComponent(Components.SIGNUP)}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
