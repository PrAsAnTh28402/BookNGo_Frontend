import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import EventGrid from "../Components/EventGrid";
import FullScreenLoader from "../Components/Loader";
import Pagination from "../Components/Pagination";
import { getEvents, getCategories } from "../Service/eventService";
import "../styles/UserHomePage.css";

const UserHomePage = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    searchQuery: "",
    category: "All",
    sortBy: "date",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const DEFAULT_LIMIT = 10;

  // Initial load
  useEffect(() => {
    loadEvents(1, filters);
    loadCategories();
  }, []);

  // Fetch events
  const loadEvents = async (pageNumber, currentFilters) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getEvents(pageNumber, currentFilters);

      setEvents(response.data || []);
      const perPage = response.limit || DEFAULT_LIMIT;
      setTotalPages(Math.max(1, Math.ceil((response.total || 0) / perPage)));
      setPage(pageNumber);
      console.log("Events in User Home Page:",events)

    } catch (err) {
      console.error("No Event Found", err);
      setError("No Event Found !!");
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error("Unable to fetch categories", error);
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    loadEvents(1, newFilters);
  };

  // Pagination
  const handlePageChange = (newPage) => {
    loadEvents(newPage, filters);
  };

  return (
    <>
      {loading && <FullScreenLoader />}

      <div className="user-home-container">
        <Navbar />

        <div className="event-grid-wrapper">
          {/* Search + Filters Row */}
          <div className="search-filter-container">
            <input
              type="text"
              className="search-bar"
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
          </div>

          {/* Error or No Events */}
          {error && <div className="error">{error}</div>}
          {!loading && events.length === 0 && !error && (
            <div className="no-events">No Events Found</div>
          )}

          {/* Event Grid */}
          {events.length > 0 && (
            <EventGrid
              events={events}
              userRole="user"
              onBook={(event) =>
                navigate("/user/book-event", { state: { event } })
              }
              onViewInfo={(event) => console.log("View Info", event)}
            />
          )}

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

export default UserHomePage;
