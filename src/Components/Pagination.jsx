import React from "react";
import "../styles/Pagination.css"; 

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null; 

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className="pagination">
      <li
        className={currentPage === 1 ? "disabled" : ""}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        &laquo;
      </li>

      {pages.map((page) => (
        <li
          key={page}
          className={currentPage === page ? "selected" : ""}
          onClick={() => onPageChange(page)}
        >
          {page}
        </li>
      ))}

      <li
        className={currentPage === totalPages ? "disabled" : ""}
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
      >
        &raquo;
      </li>
    </ul>
  );
};

export default Pagination;
