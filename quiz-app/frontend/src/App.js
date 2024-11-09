import React from "react";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import QuizForm from "./components/QuizForm";

const Home = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">Welcome to the Quiz App</h1>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<QuizForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
