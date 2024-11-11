const Quiz = ({ quiz }) => {
  return (
    <div className="relative mb-6 p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition">
      <div className="mb-4">
        <h6 className="text-sm text-gray-500">{quiz.creatorName}</h6>
        <p className="text-xl font-semibold text-blue-600">
          @{quiz.creatorUsername}
        </p>
      </div>

      <h4 className="text-2xl font-bold text-gray-900 mb-2">{quiz.title}</h4>

      <p className="text-gray-700 mb-8">{quiz.description}</p>

      <button className="absolute bottom-4 right-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition">
        Participate
      </button>
    </div>
  );
};

export default Quiz;
