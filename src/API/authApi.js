import axios from "axios";

const API_BASE_URL = `https://bookngo-backend-i9pp.onrender.com/bookngo`;

export const signupApi = (userData) => {
  return axios.post(`${API_BASE_URL}/auth/signup`, userData);
};

export const loginApi = (credentials) => {
  return axios.post(`${API_BASE_URL}/auth/login`, credentials);
};
