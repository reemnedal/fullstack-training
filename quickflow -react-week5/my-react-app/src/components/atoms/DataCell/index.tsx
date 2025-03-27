import React from "react";

interface DateCellProps {
  date: string; // Assuming the date is passed as a string
  onClick: (date: string) => void; // Function that takes a date string as an argument
}

const DateCell: React.FC<DateCellProps> = ({ date, onClick }) => {
  return (
    <div className="date-cell" onClick={() => onClick(date)}>
      {date}
    </div>
  );
};

export default DateCell;
