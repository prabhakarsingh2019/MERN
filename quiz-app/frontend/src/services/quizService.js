export const createQuiz = async (quizData) => {
  const token = localStorage.getItem("authToken");

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

export const participationUpdate = async (pdata) => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch(`/api/quiz/participate/${pdata.quizId}`, {
      method: "POST",
      body: JSON.stringify(pdata),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "server error");
    }
    return data;
  } catch (error) {
    throw error;
  }
};
