import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ParticipatePage = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState([]);
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/quiz/${quizId}`);
        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
    fetchQuiz();
  }, [quizId]);
  return <div></div>;
};

export default ParticipatePage;
