import React from "react";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import QuizForm from "./components/QuizForm";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./components/Home";
import Profile from "./components/Profile";

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Navbar />

        <div className="min-h-screen bg-gray-100 p-4">
          <Routes>
            <Route
              path="/"
              element={
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <Home />
                </div>
              }
            />
            <Route
              path="/sign-up"
              element={
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <Signup />
                </div>
              }
            />
            <Route
              path="/login"
              element={
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <Login />
                </div>
              }
            />
            <Route
              path="/create-quiz"
              element={
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <QuizForm />
                </div>
              }
            />
            <Route
              path="/profile"
              element={
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <Profile />
                </div>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
