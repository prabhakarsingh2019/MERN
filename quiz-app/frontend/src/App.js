import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import QuizForm from "./components/QuizForm";
import { AuthContext } from "./context/AuthContext";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ParticipatePage from "./components/ParticipatePage";
import { useContext } from "react";
import VerifyEmail from "./components/VerifyEmail";

const App = () => {
  const { appLoader } = useContext(AuthContext);

  if (appLoader) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl text-gray-700">Loading..</p>
        </div>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto mt-8 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-quiz" element={<QuizForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/participate/:quizId" element={<ParticipatePage />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
