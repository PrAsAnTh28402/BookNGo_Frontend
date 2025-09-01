import React from "react";
import "../styles/EventProgressBar.css";

const EventProgressDonut = ({ percent }) => {
  let color = "#000B58"; 

  if (percent >= 50 && percent < 80) color = "#ff9800"; 
  else if (percent >= 80) color = "#f44336"; 

  const circleStyle = {
    background: `conic-gradient(${color} ${percent * 3.6}deg, #F3F3E0 0deg)`,
  };

  return (
    <div className="progress-donut" style={circleStyle}>
      <span>{Math.round(percent)}%</span>
    </div>
  );
};

export default EventProgressDonut;
