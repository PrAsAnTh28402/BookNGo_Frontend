import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventProgressDonut from "../Components/EventProgressBar";
import "../styles/EventCard.css";

const EventCard = ({ event, isAdmin }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleCardClick = () => {
    if (!isAdmin) {
      navigate(`/user/booking/${event.event_id}`, { state: { event } });
    }
  };

  const handleBookNow = () => {
    navigate(`/user/booking/${event.event_id}`, { state: { event } });
  };

  const handleEditClick = () => {
    navigate(`/admin/create-event`, { state: { event } });
    setMenuOpen(false);
  };

  const handleDeleteClick = () => {
    alert(`Delete ${event.title} clicked`);
    setMenuOpen(false);
  };

  return (
    <div
      className={`event-card ${!isAdmin ? "clickable" : ""}`}
      onClick={handleCardClick}
      style={{ cursor: !isAdmin ? "pointer" : "default" }}
    >
      {/* Top Section */}
      <div className="event-top">
        {isAdmin ? (
          <EventProgressDonut
            percent={
              event.capacity
                ? ((event.capacity - event.available_seats) / event.capacity) *
                  100
                : 0
            }
          />
        ) : (
          <img
            src={event.image_url || "/default-banner.jpg"}
            alt={event.event_name}
            className="event-banner"
          />
        )}

        {/* Three Dots Menu */}
        <div
          className="menu-container"
          ref={menuRef}
          onClick={(e) => e.stopPropagation()} // prevent card click
        >
          <button
            className="three-dots-btn"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            ⋮
          </button>

          {menuOpen && (
            <div className="dropdown-menu">
              {isAdmin ? (
                <>
                  <div className="menu-item" onClick={handleEditClick}>
                    ✏️ Edit
                  </div>
                  <div className="menu-item delete" onClick={handleDeleteClick}>
                    🗑️ Delete
                  </div>
                </>
              ) : (
                <>
                  <div className="menu-item" onClick={handleBookNow}>
                    🎟️ Book Now
                  </div>
                  <div className="menu-item">👀 View Info</div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Event Info */}
      <h2 className="event-name">{event.title}</h2>
      <p className="event-detail">
        <strong>📍 Location:</strong> {event.location}
      </p>
      <p className="event-detail">
        <strong>📅 Date:</strong> {event.event_date.split("T")[0]}
      </p>
      <p className="event-detail">
        <strong>⏰ Time:</strong> {event.time}
      </p>
      <p className="event-detail">
        <strong>🎭 Category:</strong> {event.category_name}
      </p>
      <div className="event-description">
        <p className="event-description">{event.description}</p>
      </div>
      {/* Remaining Slots */}
      <p
        className={`event-slots ${
          event.available_seats < event.capacity * 0.2 ? "low" : "ok"
        }`}
      >
        🎟️ Remaining Slots: {event.available_seats} / {event.capacity}
      </p>
    </div>
  );
};

export default EventCard;
