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
import { AppContext } from "./context/AppContext";
import { useContext } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { UserStatusProvider } from "./context/UserStatus";

const App = () => {
  const { Components, component, setComponent } = useContext(AppContext);
  return (
    <UserStatusProvider>
      <BrowserRouter>
        {<Navbar />}
        {component !== Components.DEFAULT && (
          <div className=" bg-[rgba(0,0,0,0.2)] fixed top-0 left-0 w-full h-screen backdrop-blur-md z-10  flex items-center justify-center">
            <button
              className="absolute top-4 right-4 text-black p-2 rounded-full z-10  transition"
              onClick={() => setComponent(Components.DEFAULT)}
            >
              <AiOutlineClose className="text-4xl" />
            </button>
            {component === Components.LOGIN && <Login />}
            {component === Components.SIGNUP && <Signup />}
            {component === Components.FORGET_PASSWORD && <ForgotPassword />}
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/job-listings" element={<Jobs />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/create-job" element={<JobCreate />} />
          <Route path="/profile" element={<Profile />} />
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
    </UserStatusProvider>
  );
};

export default App;
