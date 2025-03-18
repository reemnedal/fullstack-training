import React from "react";
import CardContent from "../../molecules/CardContnent/index.jsx";
import "./card.css";

const Card = ({ card, isSelected, onToggleSelect }) => {
  return (
    <div 
      className={`card-container ${isSelected ? "selected" : ""}`} 
      onClick={onToggleSelect}
    >
      <CardContent card={card} isSelected={isSelected} />
    </div>
  );
};

export default Card;
