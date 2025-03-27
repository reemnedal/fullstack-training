import React from "react";
import Image from "../../atoms/Image/img";
import Text from "../../atoms/Text/index";
import Button from "../../atoms/Button/index";

interface CardProps {
  card: {
    imageUrl: string;
    name: string;
    type: string;
  };
  isSelected: boolean;
}

const CardContent: React.FC<CardProps> = ({ card, isSelected }) => {
  const fallbackImage =
    "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=149168&type=card";

  // Placeholder onClick function
  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <div className={`card ${isSelected ? "selected" : ""}`}>
      <div className="card-image-container">
        <Image
          src={card.imageUrl || fallbackImage}
          alt={card.name}
          className="card-image"
        />
        <div className="card-overlay">
          <Text className="card-name">{card.name}</Text>
        </div>
      </div>

      <div className="card-content">
        <Text className="card-type">{card.type}</Text>
        <div className="card-buttons">
          <Button
            text={isSelected ? "Selected" : "Select"}
            className={`card-button select-button ${isSelected ? "selected-button" : ""}`}
            onClick={handleClick} // Pass the onClick handler here
          />
        </div>
      </div>
    </div>
  );
};

export default CardContent;
