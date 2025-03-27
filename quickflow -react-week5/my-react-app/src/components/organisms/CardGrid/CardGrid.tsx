import React, { useEffect, useState } from "react";
import Card from "../../molecules/Card/card";
import Loader from "../../atoms/Loader";
import { CounterDisplay } from "../../atoms/counterDisplay";
import { counter } from "../../../utils";
import { API_URL } from "../../../constants";
import styles from "./cardGrid.module.css";
import Image from "../../atoms/Image/img";

// Define types for card and the selectedCards state
interface CardType {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const CardGrid: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>([]); // Specify that cards are an array of CardType
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCards, setSelectedCards] = useState<string[]>(() => {
    // Initialize selectedCards with the value from localStorage
    return JSON.parse(localStorage.getItem("selectedCards") || "[]");
  });
  const [count, setCount] = useState<number>(counter.getCount());

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setCards(data.cards.slice(0, 12)); // Assume data.cards is an array of CardType
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cards:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Store selected cards in localStorage and update the counter
    localStorage.setItem("selectedCards", JSON.stringify(selectedCards));
    counter.setCount(selectedCards.length);
    setCount(selectedCards.length);
  }, [selectedCards]);

  const handleCardSelection = (cardId: string) => {
    let updatedSelectedCards: string[];
    if (selectedCards.includes(cardId)) {
      updatedSelectedCards = selectedCards.filter((id) => id !== cardId);
    } else {
      updatedSelectedCards = [...selectedCards, cardId];
    }
    setSelectedCards(updatedSelectedCards);
  };

  const handleReset = () => {
    setSelectedCards([]);
    counter.reset();
    setCount(0);
  };

  const handleSelectAll = () => {
    const allCardIds = cards.map((card) => card.id);
    setSelectedCards(allCardIds);
  };

  const handleDeselectAll = () => {
    setSelectedCards([]);
  };

  const allCardsSelected =
    cards.length > 0 && selectedCards.length === cards.length;

  return (
    <div className={styles.cardGridContainer}>
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
        <div className={styles.cardGrid}>
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
