import { useState } from "react";
import { generateOtp, verifyYourToken } from "../services/authServices";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [flagColor, setFlagColor] = useState(true);
  const [isloading, setIsLoading] = useState(false);

  const resendHandler = async () => {
    try {
      setIsLoading(true);
      await generateOtp();
      setMessage("Email has been sent successfully");
      setFlagColor(true);
    } catch (error) {
      setMessage("Failed to send email");
      setFlagColor(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    try {
      setIsLoading(true);
      await verifyYourToken(code);
      setMessage("");
      navigate("/");
    } catch (error) {
      setMessage(error.message);
      setFlagColor(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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

        <div className="mt-6">
          <button
            disabled={isloading}
            onClick={handleVerify}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-200 shadow-md"
          >
            Verify Email
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Didn't receive the code?{" "}
            <span
              disabled={isloading}
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
                flagColor ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default VerifyEmail;
