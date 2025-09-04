import { fetchStates as fetchStatesApi, fetchCities as fetchCitiesApi} from "../api/locationApi";

export const getStates = async () => {
  try {
    return await fetchStatesApi();
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch states" };
  }
};

export const getCities = async (stateId) => {
  try {
    return await fetchCitiesApi(stateId);
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch cities" };
  }
};
