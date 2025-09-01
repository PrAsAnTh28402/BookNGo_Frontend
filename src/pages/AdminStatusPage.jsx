import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import BookingTable from "../Components/BookingTable";
import { getAllBookings, removeBooking } from "../Service/BookingService";
import "../styles/AdminStatusPage.css";
import FullScreenLoader from "../Components/Loader";
import Pagination from "../Components/Pagination";

const AdminStatusPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchBookings(currentPage, searchQuery, statusFilter);
  }, [currentPage, searchQuery, statusFilter]);

  const fetchBookings = async (page = 1, search = "", status = "") => {
    setLoading(true);
    try {
      const response = await getAllBookings({ page, limit, search, status });
      console.log("API Response:", response);

      if (response.status === "Success") {
        setTotalPages(response.totalPages || 1);
        setBookings(response.data || []);
      } else {
        setBookings([]);
        alert("Failed to fetch bookings");
      }
    } catch (error) {
      alert(error.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      await removeBooking(id);
      setBookings((prev) => prev.filter((b) => b.booking_id !== id));
      alert("Booking deleted successfully");
    } catch (error) {
      alert(error.message || "Failed to delete booking");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {loading && <FullScreenLoader />}
      <div>
        <Navbar />
        <div className="admin-status-container">
          <h2 className="page-heading">Booking Status</h2>

          {/* Filters Row */}
          <div className="filter-create-row">
            {/* Search box */}
            <input
              type="text"
              className="search-input"
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />

            {/* Status dropdown */}
            <select
              className="filter-dropdown"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {loading ? (
            <p>Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <>
              <BookingTable
                bookings={bookings}
                onDelete={handleDelete}
                allowDelete={true}
              />
              <div className="pagination-container">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminStatusPage;
