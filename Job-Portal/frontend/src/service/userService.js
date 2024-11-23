import { apiUrl } from "../utils/apiUrl";

export const signup = async (formData) => {
  try {
    const response = await fetch(`${apiUrl}/user/auth/signup`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Signup failed");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const login = async (formData) => {
  try {
    const response = await fetch(`${apiUrl}/user/auth/login`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Login failed");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const forgetPassword = async (email) => {
  try {
    const response = await fetch(`${apiUrl}/user/auth/forgot-password`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Forget password failed");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const verifyEmail = async (code) => {
  try {
    const response = await fetch(`${apiUrl}/user/auth/verify-email`, {
      method: "POST",
      body: JSON.stringify({ code }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Verify email failed");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const resendVerifyToken = async () => {
  try {
    const response = await fetch(`${apiUrl}/user/auth/generate-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Resend verify token failed");
    }
    return data;
  } catch (error) {
    throw error;
  }
};
