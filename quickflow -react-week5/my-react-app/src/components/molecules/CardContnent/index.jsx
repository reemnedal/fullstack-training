
// molecules/CardContnent/index.jsx
import React from "react";
import Image from "../../atoms/Image/img.jsx";
import Text from "../../atoms/Text/index.jsx";
import Button from "../../atoms/Button/index.jsx";
// import "./cardContent.css";

const CardContent = ({ card, isSelected }) => {
  const fallbackImage = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=149168&type=card";

  return (
    <div className={`card ${isSelected ? "selected" : ""}`}>
      <div className="card-image-container">
        <Image src={card.imageUrl || fallbackImage} alt={card.name} className="card-image" />
        <div className="card-overlay">
          <Text className="card-name">{card.name}</Text>
        </div>
      </div>

      <div className="card-content">
        <Text className="card-type">{card.type}</Text>
        <div className="card-buttons">
          <Button 
            text={isSelected ? "Selected" : "Select"} 
            className={`card-button select-button ${isSelected ? 'selected-button' : ''}`} 
          />
        </div>
      </div>
    </div>
  );
};

export default CardContent;
