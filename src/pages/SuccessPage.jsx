// SuccessPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/SuccessPage.css";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;
  console.log("Booking object:", booking);


  if (!booking) {
    return (
      <div className="success-container">
        <h2>No booking details found.</h2>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="success-page">
      {/* Left Section - Ticket + Tick */}
      <div className="left-container">
        <div className="ticket-wrapper">
          <img
            src="/Retro_Ticket.png"
            alt="Ticket"
            className="ticket-image"
          />
          <img
            src="/Confrimation.gif"
            alt="Success"
            className="tick-overlay"
          />
        </div>
      </div>

      {/* Right Section - Full container with details */}
     <div className="right-container">
  <div className="event-details-card">
    <h2 className="details-heading">Booking Details</h2>
    <p className="details-heading"><strong>Booking ID:</strong> {booking.booking_id}</p>
    <p className="details-heading"><strong>Event ID:</strong> {booking.event_id}</p>
    <p className="details-heading"><strong>Tickets:</strong> {booking.num_tickets}</p>
    <p className="details-heading"><strong>Total Amount:</strong> ₹{booking.total_amount}</p>
    <p className="details-heading"><strong>Status:</strong> {booking.status}</p>
    <p className="details-heading"><strong>Booking Date:</strong> {new Date(booking.booking_date).toLocaleString()}</p>

       <button 
          className="back-home-btn" 
          onClick={() => navigate("/user/home")}
        >
          Back to Home
        </button>
  </div>
</div>

    </div>
  );
};

export default SuccessPage;
