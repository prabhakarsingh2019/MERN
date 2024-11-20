export const signup = async (userData) => {
  try {
    const response = await fetch(
      "https://quiz-app-backend-5k5j.onrender.com/api/auth/sign-up",
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Signup failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const login = async (userdata) => {
  try {
    const response = await fetch(
      "https://quiz-app-backend-5k5j.onrender.com/api/auth/login",
      {
        method: "POST",
        body: JSON.stringify(userdata),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const verifyYourToken = async (code) => {
  try {
    const response = await fetch(
      "https://quiz-app-backend-5k5j.onrender.com/api/auth/verify-email",
      {
        method: "POST",
        body: JSON.stringify({ code: code }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Verification failed");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const generateOtp = async () => {
  try {
    const response = await fetch(
      "https://quiz-app-backend-5k5j.onrender.com/api/auth/generate-token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/auth",
        },
        credentials: "include",
      }
    );
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to generate OTP");
    }
    return data;
  } catch (error) {
    throw error;
  }
};
