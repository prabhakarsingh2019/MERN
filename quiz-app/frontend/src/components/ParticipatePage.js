import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

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

  //   const correctOption = (questionIndex, optionIndex, isCorrect) => {
  //     const selectedAnswer = selectedAnswers[questionIndex] === optionIndex;
  //   };

  const handleSubmit = () => {
    let answerIsSelected = true;
    for (let i = 0; i < quiz.questions.length; i++) {
      if (selectedAnswers[i] === undefined) {
        answerIsSelected = false;
        break;
      }
    }

    if (!answerIsSelected) {
      setMessage("Answer all the questions before submitting the quiz");
      return;
    }

    setIsSubmitted(true);
  };
  if (!quiz) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {isSubmitted && (
        <div>
          <h1 className="text-5xl font-bold mb-4 text-blue-500">Quiz Result</h1>
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
        onClick={handleSubmit}
      >
        Submit
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ParticipatePage;
