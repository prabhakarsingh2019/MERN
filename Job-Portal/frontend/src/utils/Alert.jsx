import React, { useState, useEffect } from "react";

const Alert = ({ message, type, onClose }) => {
  const durations = {
    success: 3000,
    error: 5000,
  };

  const [timeLeft, setTimeLeft] = useState(durations[type] || 3000);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 100, 0));
    }, 100);

    if (timeLeft <= 0) {
      clearInterval(interval);
      onClose();
    }

    return () => clearInterval(interval);
  }, [timeLeft, onClose]);

  const progress = (timeLeft / (durations[type] || 3000)) * 100;

  const backgroundColors = {
    success: "bg-green-600",
    error: "bg-red-600",
  };

  return (
    <div
      className={`fixed top-10 flex flex-wrap item-center p-3 rounded-lg shadow-lg text-white animate-growAndSlideDown ${
        backgroundColors[type] || "bg-blue-600"
      }`}
    >
      <p className="text-lg font-semibold ">{message}</p>
      <div className="relative ml-4  w-8 h-8">
        <svg className="w-full h-full " viewBox="0 0 36 36">
          <path
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeDasharray={`${progress}, 100`}
          />
        </svg>
        <div className="absolute inset-0 flex   items-center justify-center">
          <span className="text-sm text-white">
            {Math.ceil(timeLeft / 1000)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Alert;
