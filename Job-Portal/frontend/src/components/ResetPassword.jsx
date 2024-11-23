import { useState } from "react";
import { validateData } from "../utils/validData";
import { apiUrl } from "../utils/apiUrl";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const error = validateData("password", password);
    if (error) {
      setMessage(error);
      setLoader(false);
      return setSuccess(false);
    } else if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setLoader(false);
      return setSuccess(false);
    }
    try {
      const response = await fetch(
        `${apiUrl}/user/reset-password/${resetToken}`,
        {
          method: "POST",
          body: JSON.stringify({ password }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!data.success) {
        setMessage(data.message);
        setLoader(false);
        return setSuccess(false);
      }
      setMessage(data.message);
      setSuccess(true);
    } catch (error) {
      setMessage("Error resetting password");
      setSuccess(false);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Reset Password
          </h2>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className={`w-full py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 ${
                loader ? "cursor-not-allowed" : "cursor-pointer"
              } flex justify-center items-center`}
              disabled={loader}
            >
              {loader ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Reset Password"
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
      </div>
    </div>
  );
};

export default ResetPassword;
