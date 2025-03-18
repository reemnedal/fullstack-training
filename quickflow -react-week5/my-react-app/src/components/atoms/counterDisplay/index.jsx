import React from "react";
import Text from "../../atoms/Text/index.jsx";
import Button from "../../atoms/Button/index.jsx";
import "./counterDisplay.css";

export const CounterDisplay = ({ count, onReset, onSelectAll, onDeselectAll, allSelected }) => {
  return (
    <div className="counter-display">
      <Text className="counter-text">Selected Cards: {count}</Text>
      <div className="counter-buttons">
        <Button
          text={allSelected ? "Deselect All" : "Select All"}
          onClick={allSelected ? onDeselectAll : onSelectAll}
          className="toggle-all-button"
        />
        <Button text="Reset Selection" onClick={onReset} className="reset-button" />
      </div>
    </div>
  );
};
