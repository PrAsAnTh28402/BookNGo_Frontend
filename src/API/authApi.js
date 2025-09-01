import axios from "axios";

const API_BASE_URL = "http://localhost:5000/bookngo";

export const signupApi = (userData) => {
  return axios.post(`${API_BASE_URL}/auth/signup`, userData);
};

export const loginApi = (credentials) => {
  return axios.post(`${API_BASE_URL}/auth/login`, credentials);
};
