import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/EventBooking.css";
import FullScreenLoader from "../Components/Loader";
import { createBooking } from "../Service/bookingService";
import { getLoggedInUser } from "../Service/authService";

const BookingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { event } = location.state || {};

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    tickets: 1,
  });

  const [loading, setLoading] = useState(false); 
  const [checkingAuth, setCheckingAuth] = useState(true); 

  const user = getLoggedInUser();

  // Redirect if user not logged in
  useEffect(() => {
    if (!user?.user_id) {
      alert("⚠️ Please log in again.");
      navigate("/login");
    }
    setCheckingAuth(false);
  }, [user, navigate]);

  // ✅ Loader during auth check
  if (checkingAuth) {
    return (
      <div className="booking-page">
        <div className="booking-form-container loader-container">
          <div className="loader"></div>
          <p>Checking login status...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <p style={{ padding: "40px", textAlign: "center" }}>No event selected.</p>
    );
  }

  // --- Ticket Increment ---
  const incrementTickets = () => {
    setFormData((prev) => ({
      ...prev,
      tickets:
        prev.tickets < event.available_seats ? prev.tickets + 1 : prev.tickets,
    }));
  };

  // --- Ticket Decrement ---
  const decrementTickets = () => {
    setFormData((prev) => ({
      ...prev,
      tickets: prev.tickets > 1 ? prev.tickets - 1 : 1,
    }));
  };

  // --- Calculate Total Price ---
  const totalAmount = event ? formData.tickets * event.price : 0;

  // --- Handle Form Submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.phone || !formData.email) {
      alert("⚠️ Please fill all the fields.");
      return;
    }

    const bookingData = {
      user_id: user.user_id,
      event_id: event.event_id,
      num_tickets: formData.tickets,
      status: "confirmed",
    };

    try {
      setLoading(true); 
      const response = await createBooking(bookingData);
      setTimeout(() => {
        setLoading(true);
        navigate("/user/success", { state: { booking: response.booking } });
      }, 2500);
    } catch (error) {
      console.error("Booking failed:", error.message || error);
      alert("⚠️ Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="booking-page">
      <div className="booking-form-container">
        {/* Title */}
        <h2>Book Your Tickets</h2>

        {/* Back Button */}
        <button
          onClick={() => navigate("/user/home")}
          className="back-btn"
          disabled={loading} 
        >
          ← Back to Home
        </button>

        {/* Booking Form */}
        <form className="booking-form" onSubmit={handleSubmit}>
          {/* Event Details */}
          <div className="input-box">
            <label>Event Name</label>
            <input type="text" value={event.title} disabled />
          </div>

          <div className="input-box">
            <label>Date</label>
            <input
              type="text"
              value={new Date(event.event_date).toLocaleDateString("en-GB")}
              disabled
            />
          </div>

          <div className="input-box">
            <label>Location</label>
            <input type="text" value={event.location} disabled />
          </div>

          <div className="input-box">
            <label>Time</label>
            <input
              type="text"
              value={new Date(event.event_date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              disabled
            />
          </div>

          <div className="input-box">
            <label>Available Seats</label>
            <input type="text" value={event.available_seats} disabled />
          </div>

          <div className="input-box">
            <label>Price per Ticket</label>
            <input type="text" value={`₹${event.price}`} disabled />
          </div>

          {/* User Inputs */}
          <div className="input-box">
            <label>Your Name</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
              required
              disabled={loading}
            />
          </div>

          <div className="input-box">
            <label>Phone Number</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              required
              disabled={loading}
            />
          </div>

          <div className="input-box">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              required
              disabled={loading}
            />
          </div>

          {/* Ticket Counter */}
          <div className="input-box full-width">
            <label>Tickets</label>
            <div className="ticket-counter">
              <button
                type="button"
                onClick={decrementTickets}
                disabled={loading}
              >
                -
              </button>
              <input type="number" value={formData.tickets} readOnly />
              <button
                type="button"
                onClick={incrementTickets}
                disabled={loading}
              >
                +
              </button>
              <input type="text" value={`₹${totalAmount}`} disabled />
            </div>
          </div>

          {/* Submit Button */}
          <div className="full-width">
            <button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <div className="loader"></div> Booking...
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
