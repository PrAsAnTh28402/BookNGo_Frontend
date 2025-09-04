import { signupApi, loginApi } from "../api/authApi";

export const signupUser = async (userData) => {
  try {
    const response = await signupApi(userData);
    return response.data; // Send backend response to component
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await loginApi(credentials);

    // Save token in localStorage for session
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

export const getLoggedInUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user || null;
  } catch {
    return null;
  }
};
