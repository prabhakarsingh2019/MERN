import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import QuizForm from "./components/QuizForm";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ParticipatePage from "./components/ParticipatePage";

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Navbar />
        <div className="min-h-screen bg-gray-100">
          <div className="max-w-4xl mx-auto mt-8 p-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
              Welcome to the Quiz App
            </h1>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create-quiz" element={<QuizForm />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/participate/:quizId"
                element={<ParticipatePage />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
