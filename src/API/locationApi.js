import axios from "axios";

const CSC_API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTU4NTU1NDMsImV4cCI6MTc1NTg1OTE0M30.fJPeTXdIRFUUqdGDVCngGMy7iZr8MTj0KvoNtylPL5Q";

// Fetch states
const fetchStates = async () => {
  try {
    const response = await axios.get("https://api.countrystatecity.in/v1/countries/IN/states", {
      headers: { "X-CSCAPI-KEY": CSC_API_KEY },
    });
    setStates(response.data);
  } catch (error) {
    console.error("Failed to fetch states:", error);
  }
};

// Fetch cities based on selected state
const fetchCities = async (state_id) => {
  try {
    const response = await axios.get(
      `https://api.countrystatecity.in/v1/countries/IN/states/${state_id}/cities`,
      { headers: { "X-CSCAPI-KEY": CSC_API_KEY } }
    );
    setCities(response.data);
  } catch (error) {
    console.error("Failed to fetch cities:", error);
  }
};
