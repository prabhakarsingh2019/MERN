import { getQuiz } from "../services/quizService";

const Home = () => {
  const quiz = getQuiz();
  const func = () => {
    console.log(quiz);
  };

  return (
    <div>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Quiz App</h1>
      </div>
      <button onClick={func}>Click me</button>

      <div>
        <div>
          <h3 className="text-2xl font-bold mb-4">Participate in Quiz</h3>
        </div>
        {/* {quizs.map((item, index) => (
          <div key={index}>
            <div>
              <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
            </div>
            <div>
              <p className="text-lg">{item.description}</p>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Home;
