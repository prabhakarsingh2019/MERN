export const createQuiz = async (quizData) => {
  try {
    const response = await fetch(
      "https://quiz-app-backend-5k5j.onrender.com/api/quiz/create-quiz",
      {
        method: "POST",
        body: JSON.stringify(quizData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to create quiz");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const participationUpdate = async (pdata) => {
  try {
    const response = await fetch(
      `https://quiz-app-backend-5k5j.onrender.com/api/quiz/participate/${pdata.quizId}`,
      {
        method: "POST",
        body: JSON.stringify(pdata),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Server error");
    }
    return data;
  } catch (error) {
    throw error;
  }
};
