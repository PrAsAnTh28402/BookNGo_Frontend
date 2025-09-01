import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const UserBookingTable = ({ bookings, onSort, allowDelete = false }) => {
const [expandedRow, setExpandedRow] = useState(null);

  const toggleExpand = (id) => setExpandedRow(expandedRow === id ? null : id);

  const handleSortClick = (field) => {
    if (onSort) onSort(field);
  };

  return (
    <table className="booking-table">
      <thead>
        <tr>
          <th></th>
          <th onClick={() => handleSortClick("booking_id")}>Booking ID</th>
          <th onClick={() => handleSortClick("event_date")}>Event Name</th>
          <th>Location</th>
          <th onClick={() => handleSortClick("num_tickets")}>Tickets</th>
          <th>Price</th>
          <th>Status</th>
          {allowDelete && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking, index) => {
          const isExpanded = expandedRow === booking.booking_id;
          const eventDate = new Date(booking.event.event_date);
          const bookingDate = new Date(booking.bookind_date);
          const rowClass = index % 2 === 0 ? "row-white" : "row-orange";

          return (
            <React.Fragment key={booking.booking_id}>
              <tr className={rowClass}>
                <td onClick={() => toggleExpand(booking.booking_id)} style={{ cursor: "pointer" }}>
                  {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </td>
                <td>{booking.booking_id}</td>
                <td>{booking.event.title}</td>
                <td>{booking.event.location}</td>
                <td>{booking.num_tickets}</td>
                <td>{booking.total_amount || "-"}</td>
                <td>{booking.status}</td>
                {allowDelete && (
                  <td>
                    <button className="delete-btn">Delete</button>
                  </td>
                )}
              </tr>

              {isExpanded && (
                <tr className="expanded-row">
                  <td colSpan={allowDelete ? 8 : 7}>
                    <table className="booking-table nested-table">
                      <thead>
                        <tr>
                          <th>Event Date</th>
                          <th>Event Time</th>
                          <th>Booking Date</th>
                          <th>Booking Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="row-white">
                          <td>{eventDate.toLocaleDateString()}</td>
                          <td>{eventDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
                          <td>{bookingDate.toLocaleDateString()}</td>
                          <td>{bookingDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserBookingTable;
