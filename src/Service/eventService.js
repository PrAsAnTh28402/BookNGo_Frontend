import {
    fetchEventsApi,
    fetchStatsApi,
    editEventApi,
    deleteEventApi,
    createEventApi,
    fetchCategoriesApi,
    fetchEventByIdApi
} from '../api/eventApi';

export const getEvents= async(page, filters)=>{
    try{
        const response = await fetchEventsApi(page, filters);
        return response.data;
    } catch(error){
        throw error.response?.data || {message:"Failed to fetch events"};
    }
};

export const getEventsById=async(id)=>{
  try {
    const response=await fetchEventByIdApi(id);
    return response.data;
  } catch (error) {
    throw errror.response?.data || {message:"Failed to fetch details"};
  }
};

export const getStats= async()=>{
    try {
        const response=await fetchStatsApi();
        return response.data;
    } catch (error) {
        throw error.response?.data || {message:"Failed to fetch stats"};
    }
};

export const editEvent= async(event_id, data)=>{
    try {
        const response=await editEventApi(event_id, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || {message: "Failed to edit event"};
    }
};


export const deleteEvent = async (event_id) => {
  try {
    const response = await deleteEventApi(event_id);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete event" };
  }
};


export const createEvent = async (data) => {
  try {
    const response = await createEventApi(data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create event" };
  }
};

export const getCategories=async()=>{
  try {
    const response=await fetchCategoriesApi();
    return response.data;
    
  } catch (error) {
    throw error.response?.data ||{message: "Failed to fetch categories"};
    
  }
};