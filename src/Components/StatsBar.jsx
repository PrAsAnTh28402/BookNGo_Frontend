import React from "react";
import "../styles/StatsBar.css";

const StatsBar = ({ stats }) => {
  return (
    <div className="stats-bar">
      <div className="stat-card">
        <h4>Total Events</h4>
        <p>{stats.totalEvents || 0}</p>
      </div>
      <div className="stat-card">
        <h4>Active Events</h4>
        <p>{stats.activeEvents || 0}</p>
      </div>
      <div className="stat-card">
        <h4>Cancelled Events</h4>
        <p>{stats.cancelledEvents || 0}</p>
      </div>
      <div className="stat-card">
        <h4>Total Bookings</h4>
        <p>{stats.totalBookings || 0}</p>
      </div>
    </div>
  );
};

export default StatsBar;
