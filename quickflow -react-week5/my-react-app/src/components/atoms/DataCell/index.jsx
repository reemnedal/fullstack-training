import React from "react";

const DateCell = ({ date, onClick }) => {
  return (
    <div className="date-cell" onClick={() => onClick(date)}>
      {date}
    </div>
  );
};

export default DateCell;
