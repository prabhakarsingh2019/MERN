import { useState } from "react";
import { createQuiz } from "../services/quizService";

const QuizForm = () => {
  const [quiz, setQuiz] = useState({
    title: "",
    discription: "",
    questions: [
      {
        questionText: "",
        options: [{ text: "" }],
        correctAnswer: null,
      },
    ],
  });

  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();
    try {
      const response = await createQuiz(quiz);
      setMessage(response.message);
    } catch (error) {
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
    updatedQuestions[qIndex].options[oIndex].text = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setQuiz((prevQuiz) => ({ ...prevQuiz, [name]: value }));
  };
  const addOption = (qIndex) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex].options.push({ text: "" });
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
          options: [{ text: "" }],
          correctAnswer: null,
        },
      ],
    });
  };

  return (
    <div>
      <h1>Quiz Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Quiz Title */}
        <div>
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter title"
            name="title"
            value={quiz.title}
            required
            onChange={handleFormChange}
          />
        </div>
        {/* Quiz Description */}
        <div>
          <label>Description</label>
          <textarea
            placeholder="Enter description"
            name="discription"
            value={quiz.discription}
            required
            onChange={handleFormChange}
          />
        </div>
        {/* Quiz questions */}
        {quiz.questions.map((question, qIndex) => (
          <div>
            <label>Question {qIndex + 1}</label>
            <input
              type="text"
              placeholder="Enter question"
              name="questionText"
              required
              value={question.questionText}
              onChange={(e) =>
                handleQuestionChange(qIndex, "questionText", e.target.value)
              }
            />
            {question.options.map((option, oIndex) => (
              <div>
                <input
                  type="text"
                  placeholder="Enter option"
                  name="optionText"
                  value={option.text}
                  onChange={(e) =>
                    handleOptionChange(qIndex, oIndex, e.target.value)
                  }
                  required
                />
                <input
                  type="radio"
                  name={`correctAnswer-${qIndex}`}
                  checked={question.correctAnswer === oIndex}
                  onChange={() =>
                    handleQuestionChange(qIndex, "correctAnswer", oIndex)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeOption(qIndex, oIndex)}
                >
                  remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addOption(qIndex)}>
              Add Option
            </button>
          </div>
        ))}
        <button type="button" onClick={addQuestion}>
          Add Another Question
        </button>

        {/* Submit Button */}
        <button type="submit">Create Quiz</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
export default QuizForm;
