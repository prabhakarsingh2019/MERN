export const createQuiz = async (quizData) => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch("/api/quiz", {
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