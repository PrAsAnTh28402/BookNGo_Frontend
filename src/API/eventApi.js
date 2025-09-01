import axiosInstance from "./axiosInstance";

export const fetchEventsApi=(page=1, filters={})=>{
    return axiosInstance.get("/events",{
        params:{
            page,
            title:filters.searchQuery || "",
            category: filters.category!=="All"? filters.category:"",
            sortBy:filters.sortBy || "date",

        },
    });
};

export const fetchEventByIdApi = (id) => {
  return axiosInstance.get(`/events/${id}`);
};

export const fetchStatsApi=()=>{
    return axiosInstance.get("/events/admin/stats");
};

export const editEventApi = (event_id, data) => {
  return axiosInstance.put(`/events/${event_id}`, data);
};

// Delete Event
export const deleteEventApi = (event_id) => {
  return axiosInstance.delete(`/events/${event_id}`);
};

// Create Event
export const createEventApi = (data) => {
  return axiosInstance.post("/events/createEvent", data);
};

export const fetchCategoriesApi=()=>{
  return axiosInstance.get("/events/categories");
};