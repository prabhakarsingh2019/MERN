import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [quizzesCreated, setQuizzesCreated] = useState([]);
  const [participations, setParticipations] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();

        setUser(data.user);
        setQuizzesCreated(data.quizData);
        setParticipations(data.participations);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  if (!user) {
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
    <div className="container mx-auto p-6">
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-300 rounded">
          <p>{error}</p>
        </div>
      )}

      {/* User Profile */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-gray-600">@{user.username}</p>
        <p className="text-gray-500">Email: {user.email}</p>
        <p
          className={`mt-2 ${
            user.isVerified ? "text-green-500" : "text-red-500"
          } font-semibold`}
        >
          {user.isVerified ? "Verified" : "Not Verified"}
        </p>
        <p className="text-sm text-gray-500">
          Last Login: {new Date(user.lastLogin).toLocaleString()}
        </p>
      </div>

      {/* Quizzes Created */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Quizzes Created
        </h3>

        {quizzesCreated.length > 0 ? (
          <div className="space-y-4">
            {quizzesCreated.map((quiz, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
              >
                <h4 className="text-lg font-semibold text-gray-700">
                  {quiz.title}
                </h4>
                <p className="text-gray-600">{quiz.description}</p>
                <p className="text-sm text-gray-500">
                  Created on: {new Date(quiz.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No quizzes created yet.</p>
        )}
      </div>

      {/* Participation */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Participation</h3>

        {participations.length > 0 ? (
          <div className="space-y-4">
            {participations.map((participation, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
              >
                <h4 className="text-lg font-semibold text-gray-700">
                  {participation.quizTitle}
                </h4>
                <p className="text-sm text-gray-500">
                  Participated on:{" "}
                  {new Date(participation.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No participations yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
