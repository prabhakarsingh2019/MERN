import { useState } from "react";
import { createQuiz } from "../services/quizService";

const QuizForm = () => {
  const [error, setError] = useState(false);
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    questions: [
      {
        questionText: "",
        options: [{ option: "", isCorrect: false }],
      },
    ],
    points: 0,
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !quiz.title &&
      !quiz.description &&
      !quiz.questions.question &&
      !quiz.questions.options.option
    ) {
      setError(true);
      return setMessage("Please fill in all fields.");
    }
    try {
      const response = await createQuiz(quiz);
      setQuiz({
        title: "",
        description: "",
        questions: [
          {
            questionText: "",
            options: [{ option: "", isCorrect: false }],
          },
        ],
        points: 0,
      });
      setMessage(response.message);
    } catch (error) {
      setError(true);
      setMessage(error.message);
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index][field] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex].options[oIndex].option = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setQuiz((prevQuiz) => ({ ...prevQuiz, [name]: value }));
  };

  const addOption = (qIndex) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex].options.push({ option: "", isCorrect: false });
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const removeOption = (qIndex, oIndex) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex].options.splice(oIndex, 1);
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        {
          questionText: "",
          options: [{ text: "", isCorrect: false }],
        },
      ],
    });
  };

  const handleCorrectAnswerChange = (qIndex, oIndex) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.map(
      (option, index) => {
        return {
          ...option,
          isCorrect: index === oIndex,
        };
      }
    );
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Create a Quiz</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Quiz Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter quiz title"
            name="title"
            value={quiz.title}
            onChange={handleFormChange}
            required
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Quiz Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Description
          </label>
          <textarea
            placeholder="Enter quiz description"
            name="description"
            value={quiz.description}
            onChange={handleFormChange}
            required
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Points for each queston */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Set Score for each question
          </label>
          <input
            type="text"
            placeholder="Default value will be set to 0"
            name="points"
            value={quiz.points}
            onChange={handleFormChange}
            required
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
          <p className="mt-1 text-xs text-gray-500">
            Setting the score to 0 means there will be no scoring system applied
            to this quiz.
          </p>
        </div>

        {/* Quiz Questions */}
        {quiz.questions.map((question, qIndex) => (
          <div key={qIndex} className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">
              Question {qIndex + 1}
            </label>
            <input
              type="text"
              placeholder="Enter question"
              name="questionText"
              value={question.questionText}
              onChange={(e) =>
                handleQuestionChange(qIndex, "questionText", e.target.value)
              }
              required
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />

            {/* Question Options */}
            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Enter option"
                  name="option"
                  value={option.option}
                  onChange={(e) =>
                    handleOptionChange(qIndex, oIndex, e.target.value)
                  }
                  required
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="radio"
                  name={`correctAnswer-${qIndex}`}
                  checked={option.isCorrect}
                  onChange={() => handleCorrectAnswerChange(qIndex, oIndex)}
                  className="mt-2"
                />
                <button
                  type="button"
                  onClick={() => removeOption(qIndex, oIndex)}
                  className="text-red-600 mt-2"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addOption(qIndex)}
              className="py-1 px-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 mt-2"
            >
              Add Option
            </button>
          </div>
        ))}

        {/* Add Another Question */}
        <button
          type="button"
          onClick={addQuestion}
          className="py-1 px-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 mt-2"
        >
          Add Another Question
        </button>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full mt-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Create Quiz
          </button>
        </div>
      </form>

      {/* Success/Failure Message */}
      {message && (
        <p
          className={`${
            error ? "text-red-500" : "text-green-500"
          }text-center text-xl-1  mt-4`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default QuizForm;
