import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { participationUpdate } from "../services/quizService";

const ParticipatePage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!isLoggedIn) {
    navigate("/sign-up");
  }
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    questions: [],
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(
          `https://quiz-app-backend-5k5j.onrender.com/api/quiz/${quizId}`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleOptionChange = (questionIndex, optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex,
    });
  };

  const optionClassChange = (questionIndex, optionIndex, isCorrect) => {
    const selectedAnswer = selectedAnswers[questionIndex] === optionIndex;
    if (isSubmitted) {
      if (selectedAnswer) {
        return isCorrect ? "bg-green-500 text-white" : "bg-red-500 text";
      } else {
        return isCorrect ? "bg-green-500 text-white" : "bg-gray-200";
      }
    }
    return selectedAnswer ? "bg-blue-500 text-white" : "bg-gray-200";
  };

  const handleSubmit = async () => {
    let answerIsSelected = true;
    for (let i = 0; i < quiz.questions.length; i++) {
      if (selectedAnswers[i] === undefined) {
        answerIsSelected = false;
        break;
      }
    }
    if (!answerIsSelected) {
      setLoading(false);
      return setMessage("Answer all the questions before submitting the quiz");
    }
    const definedScore = quiz.points;
    let calculateScore = 0;
    if (definedScore !== 0) {
      calculateScore = quiz.questions.reduce((acc, question, index) => {
        const correctOption = question.options.findIndex(
          (option) => option.isCorrect
        );
        const isCorrect = selectedAnswers[index] === correctOption;
        return acc + (isCorrect ? quiz.points : 0);
      }, 0);
      setScore(calculateScore);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    const reqdata = {
      quizId,
      score: calculateScore,
      selectedAnswers,
    };

    setIsSubmitted(true);
    try {
      await participationUpdate(reqdata);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="p-6 bg-gray-100 min-h-screen">
      {message && <p className="text-4xl  mb-4 text-black-700">{message}</p>}
      {isSubmitted && (
        <div>
          <div>
            <h1 className="text-5xl font-bold mb-4 text-blue-500">
              Quiz Result
            </h1>
          </div>
          {quiz.points !== 0 && (
            <div>
              <p className="text-2xl  mb-4 text-gray-700">Your Score:</p>
              <p className="text-2xl font-bold mb-4 text-gray-700">{score}</p>
            </div>
          )}
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-3xl font-bold  mb-2">{quiz.title}</h1>
        <h4 className="text-lg text-gray-600">{quiz.description}</h4>
      </div>

      <div className="space-y-8">
        {quiz.questions.map((question, qindex) => (
          <div key={qindex} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <p className="text-xl font-semibold">Question {qindex + 1}</p>
              <p className="text-lg text-gray-800">{question.question}</p>
            </div>

            <div className="space-y-4">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <button
                    type="button"
                    className={`w-full py-2 px-4 border rounded-lg bg-grey-500 hover:bg-blue-200 focus:outline-none focus:ring-2  focus:bg-blue-400 ${optionClassChange(
                      qindex,
                      optionIndex,
                      option.isCorrect
                    )}`}
                    disabled={isSubmitted}
                    onClick={() => handleOptionChange(qindex, optionIndex)}
                  >
                    {option.option}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        className=" px-8 py-4 mx-2 my-4 rounded-lg shadow-md bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
        disabled={isSubmitted}
        onClick={() => {
          setLoading(true);
          setTimeout(() => {
            handleSubmit();
          }, 500);
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default ParticipatePage;
