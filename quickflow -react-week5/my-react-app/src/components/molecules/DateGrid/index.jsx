import React from "react";
import DateCell from "../../atoms/DataCell/index.jsx";

 

const DateGrid = ({ monthDates, events, onDateClick }) => {
  return (
    <div className="date-grid">
      {monthDates.map((date) => (
        <div
          key={date}
          className="date-cell"
          onClick={() => onDateClick(date)}
        >
          <div>{date}</div>
          {events[date] && <div className="event-indicator">🎉</div>}
        </div>
      ))}
    </div>
  );
};

export default DateGrid;
