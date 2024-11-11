import { useEffect, useState } from "react";
import Quiz from "./Quiz";
const Home = () => {
  const [quizes, setQuizes] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch("/api/quiz/get-quiz");
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to get quiz");
        }
        setQuizes(data);
      } catch (error) {
        throw error;
      }
    };
    fetchQuiz();
  }, []);
  const func = () => {
    console.log(quizes);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6  text-white">
        <h1 className="text-black text-4xl font-bold">
          Welcome to the Quiz App
        </h1>
      </div>

      <div className="max-w-4xl mx-auto mt-8 p-4">
        <h3 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Participate in Quiz
        </h3>

        {quizes.map((quiz, index) => (
          <Quiz key={index} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};

export default Home;
