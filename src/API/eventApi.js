import axios from "axios";

const API_BASE_URL = `https://bookngo-backend-i9pp.onrender.com/bookngo/events`;

// Helper to get token from localStorage
const getAuthToken = () => localStorage.getItem("token");

// Fetch events with optional filters
export const fetchEventsApi = (page = 1, filters = {}) => {
  const params = {
    page,
    title: filters.searchQuery || "",
    category: filters.category !== "All" ? filters.category : "",
    sortBy: filters.sortBy || "date",
  };

  return axios.get(`${API_BASE_URL}`, {
    params,
    headers: {
      Authorization: getAuthToken() ? `Bearer ${getAuthToken()}` : undefined,
    },
  });
};

// Fetch single event by ID
export const fetchEventByIdApi = (id) => {
  return axios.get(`${API_BASE_URL}/${id}`, {
    headers: {
      Authorization: getAuthToken() ? `Bearer ${getAuthToken()}` : undefined,
    },
  });
};

// Fetch stats (admin only)
export const fetchStatsApi = () => {
  return axios.get(`${API_BASE_URL}/admin/stats`, {
    headers: {
      Authorization: getAuthToken() ? `Bearer ${getAuthToken()}` : undefined,
    },
  });
};

// Edit event
export const editEventApi = (event_id, data) => {
  return axios.put(`${API_BASE_URL}/${event_id}`, data, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      "Content-Type": "application/json",
    },
  });
};

// Delete event
export const deleteEventApi = (event_id) => {
  return axios.delete(`${API_BASE_URL}/${event_id}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
};

// Create event
export const createEventApi = (data) => {
  return axios.post(`${API_BASE_URL}/createEvent`, data, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      "Content-Type": "application/json",
    },
  });
};

// Fetch event categories
export const fetchCategoriesApi = () => {
  return axios.get(`${API_BASE_URL}/categories`, {
    headers: {
      Authorization: getAuthToken() ? `Bearer ${getAuthToken()}` : undefined,
    },
  });
};
