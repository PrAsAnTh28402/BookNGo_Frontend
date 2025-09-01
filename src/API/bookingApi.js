import axios from "axios";

const API_BASE_URL = "http://localhost:5000/bookngo/bookings";

// Helper to get token from localStorage
const getAuthToken = () => localStorage.getItem("token");

// Fetch all bookings (admin only)
export const getBookings = async ({
  page = 1,
  limit = 10,
  search = "",
  status = "",
  sortBy = "created_at",
  sortOrder = "desc",
} = {}) => {
  const token = getAuthToken();

  const params = new URLSearchParams({
    page,
    limit,
    search,
    status,
    sortBy,
    sortOrder,
  });

  const { data } = await axios.get(`${API_BASE_URL}/Allbookings?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};


// Delete a booking (admin only)
export const deleteBooking = async (id) => {
  const token = getAuthToken();
  const { data } = await axios.delete(`${API_BASE_URL}/Delbookings/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Get bookings for a specific user
export const getUserBookings = async (userId) => {
  const token = getAuthToken();
  const { data } = await axios.get(`${API_BASE_URL}/users/${userId}/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Create a booking (user)
export const createBookingApi = (data) => {
  const token = getAuthToken();
  return axios.post(`${API_BASE_URL}/PostBooking`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


export const getUserIndBookings=({
  userId,
  page=1, limit=6, search="", filter="",
  sortBy="booking_date", sortOrder="desc",
})=>{
const url = `${API_BASE_URL}/IndBookings/${userId}?page=${page}&limit=${limit}&search=${encodeURIComponent(
    search
  )}&filter=${filter}&sortBy=${sortBy}&sortOrder=${sortOrder}`;

  return axios.get(url,{
    headers:{
      Authorization:`Bearer ${getAuthToken()}`,
      "Content-Type":"application/json"
    },
  });
};
