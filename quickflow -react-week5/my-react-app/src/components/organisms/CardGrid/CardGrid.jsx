// organisms/CardGrid/cardGrid.jsx
import React, { useEffect, useState } from "react";
import Card from "../../molecules/Card/card.jsx";
import Loader from "../../atoms/Loader/index.jsx";
import { CounterDisplay } from "../../atoms/counterDisplay/index.jsx";
import { counter } from "../../../utils/index.js";
import { API_URL } from "../../../constants/index.js";
import "./cardGrid.css";

const CardGrid = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Get selected cards from localStorage or default to empty array
  const [selectedCards, setSelectedCards] = useState(
    JSON.parse(localStorage.getItem("selectedCards")) || []
  );
  
  // Initialize count from counter utility
  const [count, setCount] = useState(counter.getCount());
  
  // Fetch cards on component mount
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setCards(data.cards.slice(0, 12)); // Fetch first 12 cards
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cards:", error);
        setLoading(false);
      });
  }, []);
  
  // Update localStorage whenever selectedCards changes
  useEffect(() => {
    localStorage.setItem("selectedCards", JSON.stringify(selectedCards));
    // Update counter to match the number of selected cards
    counter.setCount(selectedCards.length);
    setCount(selectedCards.length);
  }, [selectedCards]);

  // Function to handle selection of individual cards
  const handleCardSelection = (cardId) => {
    let updatedSelectedCards;
    
    if (selectedCards.includes(cardId)) {
      // Deselect: remove card from selected cards
      updatedSelectedCards = selectedCards.filter((id) => id !== cardId);
    } else {
      // Select: add card to selected cards
      updatedSelectedCards = [...selectedCards, cardId];
    }
    
    setSelectedCards(updatedSelectedCards);
  };
  
  // Function to reset all selections
  const handleReset = () => {
    setSelectedCards([]);
    counter.reset();
    setCount(0);
  };
  
  // Function to select all cards
  const handleSelectAll = () => {
    const allCardIds = cards.map(card => card.id);
    setSelectedCards(allCardIds);
  };
  
  // Function to deselect all cards
  const handleDeselectAll = () => {
    setSelectedCards([]);
  };
  
  // Check if all cards are selected
  const allCardsSelected = cards.length > 0 && selectedCards.length === cards.length;

  return (
    <div className="card-grid-container">
      <CounterDisplay 
        count={count}
        onReset={handleReset}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
        allSelected={allCardsSelected}
      />
      
      {loading ? (
        <Loader />
      ) : (
        <div className="card-grid">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              isSelected={selectedCards.includes(card.id)}
              onToggleSelect={() => handleCardSelection(card.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardGrid;