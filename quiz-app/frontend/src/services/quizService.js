export const createQuiz = async (quizData) => {
  const token = localStorage.getItem("authToken");
  console.log(quizData);
  try {
    const response = await fetch("/api/quiz/create-quiz", {
      method: "POST",
      body: JSON.stringify(quizData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to create quiz");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const getQuiz = async () => {
  try {
    const response = await fetch("/api/quiz/get-quiz", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to get quiz");
    }
    return data;
  } catch (error) {
    throw error;
  }
};
