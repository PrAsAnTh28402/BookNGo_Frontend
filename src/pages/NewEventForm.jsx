import React, { useState, useEffect } from "react";
import axios from "axios";
import { createEvent, getCategories } from "../Service/eventService";
import "../styles/AddEventForm.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const CSC_API_KEY = "bktTRVpIWnRkb0t0RTlEVHhFS2JaS1BUdm0zQVhxUUZkck9IbkxXYg==";
const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: 0,
    state_id: "",
    city_id: "",
    location: "",
    event_date: "",
    time: "",
    price: "",
    capacity: "",
    image_url: "https://via.placeholder.com/400x250.png?text=Event",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const editEvent = location.state?.event;
  const isEditMode = !!editEvent;

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Fetch states on mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(
          "https://api.countrystatecity.in/v1/countries/IN/states",
          { headers: { "X-CSCAPI-KEY": CSC_API_KEY } }
        );
        setStates(response.data);
      } catch (error) {
        console.error("Failed to fetch states", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data || []);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchStates();
    fetchCategories();
  }, []);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (!formData.state_id) {
      setCities([]);
      return;
    }

    const stateIso2 = states.find(
      (st) => st.id === parseInt(formData.state_id)
    )?.iso2;

    if (!stateIso2) return;

    const fetchCities = async () => {
      try {
        const response = await axios.get(
          `https://api.countrystatecity.in/v1/countries/IN/states/${stateIso2}/cities`,
          { headers: { "X-CSCAPI-KEY": CSC_API_KEY } }
        );
        setCities(response.data);

        // ✅ Prepopulate city only after cities are loaded
        if (editEvent?.city_id) {
          const cityExists = response.data.some(
            (city) => city.id === parseInt(editEvent.city_id)
          );
          if (cityExists) {
            setFormData((prev) => ({
              ...prev,
              city_id: parseInt(editEvent.city_id),
            }));
          }
        }
      } catch (error) {
        console.error("Failed to fetch cities", error);
        setCities([]);
      }
    };

    fetchCities();
  }, [formData.state_id, states, editEvent]);

  useEffect(() => {
    if (editEvent && states.length && categories.length) {
      // Format time correctly
      let formattedTime = "";
      if (editEvent.time) {
        const date = new Date(`1970-01-01T${editEvent.time}`);
        const hh = date.getHours().toString().padStart(2, "0");
        const mm = date.getMinutes().toString().padStart(2, "0");
        formattedTime = `${hh}:${mm}`;
      }

      setFormData({
        title: editEvent.title || "",
        description: editEvent.description || "",
        category_id: editEvent.category_id || "",
        state_id: editEvent.state_id || "",
        city_id: editEvent.city_id || "",
        location: editEvent.location || "",
        event_date: editEvent.event_date
          ? new Date(editEvent.event_date).toISOString().split("T")[0]
          : "",
        time: formattedTime, // ✅ properly formatted for time input
        price: editEvent.price || "",
        capacity: editEvent.capacity || "",
        available_seats: editEvent.available_seats || "",
        image_url: editEvent.image_url || "",
      });
    }
  }, [editEvent, states, categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (parseInt(formData.available_seats) > parseInt(formData.capacity)) {
      setErrors((prev) => ({
        ...prev,
        available_seats: "Available seats cannot exceed total capacity",
      }));
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.title) tempErrors.title = "Event title is required";
    if (!formData.category_id) tempErrors.category_id = "Category required";
    if (!formData.state_id) tempErrors.state_id = "State required";
    if (!formData.city_id) tempErrors.city_id = "City required";
    if (!formData.location) tempErrors.location = "Location required";
    if (!formData.event_date) tempErrors.event_date = "Date required";
    if (!formData.time) tempErrors.time = "Time required";
    if (!formData.price) tempErrors.price = "Price required";
    if (!formData.capacity) tempErrors.capacity = "Capacity required";
    if (!formData.image_url) tempErrors.image_url = "Image URL required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      let imageUrl = formData.image_url;

      // 🚀 In Sprint 2, replace this with real upload
      if (selectedImage) {
        setUploading(true);
        imageUrl = await uploadImage(selectedImage);
        setUploading(false);
      }

      const payload = { ...formData, image_url: imageUrl };

      if (isEditMode) {
        await updateEvent(editEvent.event_id, payload);
        alert("Event updated successfully!");
      } else {
        await createEvent(payload);
        alert("Event created successfully!");
      }

      navigate("/admin/home");
    } catch (error) {
      console.error("Event submission failed", error);
      alert(error.message || "Failed to submit event");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <main className="event-form-page">
      <div className="page-title-container">
        <button
          className="back-home-btn"
          onClick={() => navigate("/admin/home")}
        >
          ← Back to Home
        </button>
      </div>

      {/* Title container */}
      <div className="page-title-container">
        <h1 className="page-title">
          {isEditMode ? "Edit Event" : "Create New Event"}
        </h1>
      </div>

      {/* Form container */}
      <div className="form-container">
        <form className="event-form" onSubmit={handleSubmit} noValidate>
          {/* Event Title */}
          <div className="form-group span-2">
            <label htmlFor="title">Event Title</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g., Music Fest 2025"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <p className="error-text">{errors.title}</p>}
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category_id">Category</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {errors.category_id && (
              <p className="error-text">{errors.category_id}</p>
            )}
          </div>

          {/* State */}
          <div className="form-group">
            <label htmlFor="state_id">State</label>
            <select
              id="state_id"
              name="state_id"
              value={formData.state_id}
              onChange={handleChange}
            >
              <option value="">-- Select State --</option>
              {states.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.name}
                </option>
              ))}
            </select>
            {errors.state_id && <p className="error-text">{errors.state_id}</p>}
          </div>

          {/* City */}
          <div className="form-group">
            <label htmlFor="city_id">City</label>
            <select
              id="city_id"
              name="city_id"
              value={formData.city_id}
              onChange={handleChange}
              disabled={!formData.state_id || cities.length === 0}
            >
              <option value="">-- Select City --</option>
              {cities.map((ct) => (
                <option key={ct.id} value={ct.id}>
                  {ct.name}
                </option>
              ))}
            </select>
            {errors.city_id && <p className="error-text">{errors.city_id}</p>}
          </div>

          {/* Location */}
          <div className="form-group span-2">
            <label htmlFor="location">Exact Location / Landmark</label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="e.g., Chennai Marina Grounds Gate 3"
              value={formData.location}
              onChange={handleChange}
            />
            {errors.location && <p className="error-text">{errors.location}</p>}
          </div>

          {/* Date */}
          <div className="form-group">
            <label htmlFor="event_date">Date</label>
            <input
              id="event_date"
              name="event_date"
              type="date"
              value={formData.event_date}
              onChange={handleChange}
            />
            {errors.event_date && (
              <p className="error-text">{errors.event_date}</p>
            )}
          </div>

          {/* Time */}
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
            />
            {errors.time && <p className="error-text">{errors.time}</p>}
          </div>

          {/* Price */}
          <div className="form-group">
            <label htmlFor="price">Price (₹)</label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="1499.00"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && <p className="error-text">{errors.price}</p>}
          </div>

          {/* Capacity */}
          <div className="form-group">
            <label htmlFor="capacity">Capacity</label>
            <input
              id="capacity"
              name="capacity"
              type="number"
              min="1"
              placeholder="e.g., 500"
              value={formData.capacity}
              onChange={handleChange}
            />
            {errors.capacity && <p className="error-text">{errors.capacity}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="available_seats">Available Seats</label>
            <input
              id="available_seats"
              name="available_seats"
              type="number"
              min="0"
              placeholder="e.g., 500"
              value={formData.available_seats}
              onChange={handleChange}
            />
            {errors.available_seats && (
              <p className="error-text">{errors.available_seats}</p>
            )}
          </div>

          {/* Description */}
          <div className="form-group span-2">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Add event details..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Form actions */}
          <div className="form-actions">
            <button
              type="button"
              className="secondary-btn"
              onClick={() => {
                handleSubmit;
              }}
              disabled={submitting}
            >
              Cancel
            </button>
            <button type="submit" className="primary-btn" disabled={submitting}>
              {submitting
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                ? "Update Event"
                : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateEventForm;
