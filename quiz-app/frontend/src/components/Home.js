import { useContext, useEffect, useState } from "react";
import Quiz from "./Quiz";

const Home = () => {
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch("/api/quiz/quizes");
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to get quiz");
        }
        setQuizes(data);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
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
