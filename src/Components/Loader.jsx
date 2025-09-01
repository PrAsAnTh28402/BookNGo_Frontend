import React from "react";
import "../styles/FullScreenLoader.css";

const FullScreenLoader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-box">
        <div className="loader-logo">BookNGo</div>
        <div className="spinner"></div>
        <p className="loading-text">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default FullScreenLoader;
