
import {
    getBookings as getBookingsApi,
    deleteBooking as deleteBookingApi,
    createBookingApi as UsersbookingApi,
    getUserIndBookings as getUserBookingsApi
} from "../API/bookingApi";

// Fetch all bookings
export const getAllBookings = async ({
  page = 1,
  limit = 10,
  search = "",
  status = "",
  sort = "",
} = {}) => {
  try {
    const data = await getBookingsApi({
      page,
      limit,
      search,
      status,
      sort,
    });
    return data; // Return clean data to page
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch bookings" };
  }
};

// Delete a booking
export const removeBooking = async (id) => {
  try {
    const data = await deleteBookingApi(id);
    return data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete booking" };
  }
};

export const createBooking = async (data) => {
  try {
    const response = await UsersbookingApi(data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create booking" };
  }
};

export const getUserBookings = async ({
  userId,
  page = 1,
  limit = 6,
  search = "",
  filter = "",
  sortBy = "booking_date",
  sortOrder = "desc",
}) => {
  try {
    const response = await getUserBookingsApi({
      userId,
      page,
      limit,
      search,
      filter,
      sortBy,
      sortOrder,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    throw error;
  }
};
