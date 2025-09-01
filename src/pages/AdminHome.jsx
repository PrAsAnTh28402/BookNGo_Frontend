import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Navbar from "../Components/Navbar";
import Pagination from "../Components/Pagination";
import StatsBar from "../Components/StatsBar";
import EventGrid from "../Components/EventGrid";
import { getStats, getEvents, getCategories } from "../Service/eventService";
import "../styles/AdminHomePage.css";
import FullScreenLoader from "../Components/Loader";

const AdminHomePage = () => {
  const navigate = useNavigate(); 
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeEvents: 0,
    cancelledEvents: 0,
    totalBookings: 0,
  });
  const [filters, setFilters] = useState({
    searchQuery: "",
    category: "All",
    status: "All",
    sortBy: "date",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  const EVENTS_PER_PAGE = 8;

  useEffect(() => {
    loadStats();
    loadEvents(1, filters);
    loadCategories();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const response = await getStats();
      setStats({
        totalEvents: response.total_events || 0,
        activeEvents: response.active_events || 0,
        cancelledEvents: response.cancelled_events || 0,
        totalBookings: response.total_bookings || 0,
      });
    } catch (err) {
      setError("Unable to fetch stats");
    }
    setLoading(false);
  };

  const loadEvents = async (pageNumber, currentFilters) => {
    setLoading(true);
    try {
      const response = await getEvents(pageNumber, currentFilters);
      setEvents(response.data);
      setPage(pageNumber);
      setTotalPages(Math.ceil(response.total / EVENTS_PER_PAGE));
    } catch (err) {
      setError("Unable to fetch events");
    }
    setLoading(false);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    loadEvents(1, newFilters);
  };

  const handlePageChange = (newPage) => {
    loadEvents(newPage, filters);
  };

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error("Unable to fetch categories", error);
    }
  };

  return (
    <>
      {loading && <FullScreenLoader />}
      <div className="admin-landing-page">
        <Navbar />
        <StatsBar stats={stats} />

        <div className="event-grid-wrapper">
          {/* Search + Filters + Create Event Row */}
          <div className="filter-create-row">
            {/* Search input */}
            <input
              type="text"
              className="search-input"
              placeholder="Search events..."
              value={filters.searchQuery}
              onChange={(e) =>
                handleFilterChange({ ...filters, searchQuery: e.target.value })
              }
            />

            {/* Category dropdown */}
            <select
              className="filter-dropdown"
              value={filters.category}
              onChange={(e) =>
                handleFilterChange({ ...filters, category: e.target.value })
              }
            >
              <option value="All">All Categories</option>
              {categories.map((c) => (
                <option key={c.category_id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Create Event button */}
            <button
              className="create-event-button"
              onClick={() => navigate("/admin/create-event")}
            >
              + Create Event
            </button>
          </div>

          {error && <div className="error">{error}</div>}

          {/* Event Grid */}

          <EventGrid
            events={events}
            userRole="admin"
            onDelete={(event_id) =>
              setEvents((prev) =>
                prev.filter((event) => event.event_id !== event_id)
              )
            }
            onEdit={(event) =>
              navigate("/admin/create-event", { state: { event } })
            }
            onViewInfo={(event) => console.log("View Info", event)}
          />

          {/* Pagination */}
          <div className="pagination-container">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHomePage;
