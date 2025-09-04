import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Pagination from "../Components/Pagination";
import FullScreenLoader from "../Components/Loader";
import { getUserBookings } from '../Service/bookingService';
import UserBookingTable from "../Components/UserPrevBook_Table";

const UserPreviousBookingsPage = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.user_id;
  console.log("User ID", userId);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: "", // default value
    date: "", // another filter if you need
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("booking_date");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetchBookings(currentPage);
  }, [currentPage, searchTerm, filterStatus, sortBy, sortOrder]);

  const fetchBookings = async (page = 1) => {
    setLoading(true);

    try {
      const response = await getUserBookings({
        userId,
        page,
        limit,
        search: searchTerm,
        filter: filterStatus,
        sortBy,
        sortOrder,
      });

      if (response.status === "Success") {
        setBookings(response.date || []);
        setTotalPages(response.totalPages || 1);
      } else {
        setBookings([]);
        alert(response.message || " Failed to fetch bookings");
      }
    } catch (error) {
      alert(error.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <>
      {loading && <FullScreenLoader />}
      <Navbar />
      <div className="user-bookings-container">
        <h1 className="page-heading">My Previous Bookings</h1>


        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <>
            <UserBookingTable
              bookings={bookings || []}
              allowDelete={false}
              onSort={handleSortChange}
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
    </>
  );
};

export default UserPreviousBookingsPage;
