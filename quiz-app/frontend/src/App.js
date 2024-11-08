import React from "react";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";

const Home = () => (
  <div>
    <h1>Welcome to the Quiz App</h1>
    <Link to="/sign-up">Go to Signup</Link>
    <Link to="/login">Login</Link>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
