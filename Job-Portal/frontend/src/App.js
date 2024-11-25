import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Jobs from "./components/Jobs";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ResetLayout from "./layouts/ResetLayout";
import VerifyEmail from "./components/VerifyEmail";
import JobCreate from "./components/JobCreate";

const App = () => {
  return (
    <BrowserRouter>
      {<Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/job-listings" element={<Jobs />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/create-job" element={<JobCreate />} />
        <Route
          path="/reset-password/:resetToken"
          element={
            <ResetLayout>
              <ResetPassword />
            </ResetLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
