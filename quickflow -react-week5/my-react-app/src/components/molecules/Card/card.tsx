import React from "react";
import CardContent from "../../molecules/CardContnent/index";
import styles from "./card.module.css"; // Import the CSS module

interface CardProps {
  card: any; // You should replace 'any' with a more specific type based on the structure of the 'card' object.
  isSelected: boolean;
  onToggleSelect: () => void;
}

const Card: React.FC<CardProps> = ({ card, isSelected, onToggleSelect }) => {
  return (
    <div
      className={`${styles.cardContainer} ${isSelected ? styles.selected : ""}`}
      onClick={onToggleSelect}
    >
      <CardContent card={card} isSelected={isSelected} />
    </div>
  );
};

export default Card;
