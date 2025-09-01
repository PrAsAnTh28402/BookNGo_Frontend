import React from "react";
import EventCard from "./EventCard";
import "../styles/EventGrid.css";

const EventGrid = ({ events, onDelete, onEdit, onBook, onViewInfo, userRole }) => {
  return (
    <div className="event-grid">
      {events.map((event) => (
        <EventCard
          key={event.event_id}
          event={event}
          isAdmin={userRole === "admin"}   
          onEdit={onEdit}                  
          onDelete={onDelete}
          onBook={onBook}
          onViewInfo={onViewInfo}
        />
      ))}
    </div>
  );
};

export default EventGrid;
