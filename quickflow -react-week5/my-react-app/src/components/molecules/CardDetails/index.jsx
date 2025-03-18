import React from "react";
import Text from "../../atoms/Text/index.jsx";
import Button from "../../atoms/Button/index.jsx";
// import "./cardDetails.css";

const CardDetails = ({ card, onClose }) => {
  return (
    <div className="card-detail-view">
      <div className="detail-header">
        <Text className="card-name detail-name">{card.name}</Text>
      </div>
      <Text className="card-type">Type: {card.type}</Text>
      <div className="description-container">
        <Text className="card-description">Description: {card.flavor}</Text>
      </div>
      <Button text="Close" onClick={onClose} className="close-button" />
    </div>
  );
};

export default CardDetails;
