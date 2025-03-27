import React from "react";
import Text from "../../atoms/Text";
import Button from "../../atoms/Button";
import styles from "./counterDisplay.module.css"; // Import CSS module for counterDisplay

interface CounterDisplayProps {
  count: number;
  onReset: () => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  allSelected: boolean;
}

export const CounterDisplay: React.FC<CounterDisplayProps> = ({
  count,
  onReset,
  onSelectAll,
  onDeselectAll,
  allSelected,
}) => {
  return (
    <div className={styles["counter-display"]}>
      {" "}
      {/* Ensure the class name matches exactly */}
      <Text className={styles["counter-text"]}>
        Selected Cards: {count}
      </Text>{" "}
      {/* Ensure the class name matches exactly */}
      <div className={styles["counter-buttons"]}>
        {" "}
        {/* Ensure the class name matches exactly */}
        <Button
          text={allSelected ? "Deselect All" : "Select All"}
          onClick={allSelected ? onDeselectAll : onSelectAll}
        />
        <Button text="Reset Selection" onClick={onReset} />
      </div>
    </div>
  );
};
