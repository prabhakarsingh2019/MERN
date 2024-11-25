import { useState } from "react";
import { resendVerifyToken, verifyEmail } from "../service/userService";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [loader, setLoader] = useState(false);
  const [code, setCode] = useState("");
  const [success, setSuccess] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const resendHandler = async () => {
    setLoader(true);
    try {
      await resendVerifyToken();
      setSuccess(true);
      setMessage("Verification code has been sent to your email.");
    } catch (error) {
      setSuccess(false);
      setMessage(error.message);
    } finally {
      setLoader(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (code === "") {
      setSuccess(false);
      setMessage("Please enter the verification code");
      return setLoader(false);
    }
    try {
      await verifyEmail(code);
      setSuccess(true);
      setMessage("Email verified successfully");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setSuccess(false);
      setMessage(error.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white py-8 px-6 rounded-lg shadow-lg w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold text-gray-800">
              Verify Your Email
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Enter the verification code sent to your email address.
            </p>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div>
              <label
                htmlFor="verificationCode"
                className="block text-center text-gray-700 text-sm font-medium mb-2"
              >
                Verification Code
              </label>
              <input
                id="verificationCode"
                type="text"
                placeholder="Enter Verification Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
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
                  "Verify Email"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Didn't receive the code?{" "}
              <span
                disabled={loader}
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={resendHandler}
              >
                Resend Code
              </span>
            </p>
          </div>

          {message && (
            <div className="mt-6 text-center">
              <p
                className={`text-sm font-medium ${
                  success ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
