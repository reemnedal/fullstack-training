import React from "react";
import DateCell from "../../atoms/DataCell/index";

// Define types for the props
interface DateGridProps {
  monthDates: number[]; // Array of dates (numbers)
  events: { [date: number]: any }; // Events mapped by date (using number as the key)
  onDateClick: (date: number) => void; // Function that takes a date and returns void
}

const DateGrid: React.FC<DateGridProps> = ({
  monthDates,
  events,
  onDateClick,
}) => {
  return (
    <div className="date-grid">
      {monthDates.map((date) => (
        <div key={date} className="date-cell" onClick={() => onDateClick(date)}>
          <div>{date}</div>
          {events[date] && <div className="event-indicator">🎉</div>}
        </div>
      ))}
    </div>
  );
};

export default DateGrid;
