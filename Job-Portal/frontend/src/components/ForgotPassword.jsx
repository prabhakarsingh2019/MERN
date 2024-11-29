import { useState } from "react";
import { validateData } from "../utils/validData";
import { forgetPassword } from "../service/userService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");

  const handleDataChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const newError = validateData("email", email);
    if (newError) {
      setError(newError);
      return setLoader(false);
    }
    try {
      const res = await forgetPassword(email);
      setMessage(res.message);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="max-w-sm m-10 w-full m-auto sm:max-w-md px-4 py-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Forgot Password</h2>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="e.g. johndoe@example.com"
            onChange={handleDataChange}
            className={`w-full p-3 border rounded-md focus:ring focus:ring-primary focus:outline-none transition ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
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
              "Submit"
            )}
          </button>
        </div>
      </form>
      {message && (
        <p
          className={`text-center text-xs mt-3 ${
            message.includes("required") ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default ForgotPassword;
