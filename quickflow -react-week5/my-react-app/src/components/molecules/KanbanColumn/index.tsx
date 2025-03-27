import React, { useRef } from "react";
import KanbanCard from "../KanbanCard";
import styles from "./KanbanColumn.module.css"; // Import the CSS module

import { useDrop, ConnectDropTarget } from "react-dnd";

// Define types for the props
interface KanbanColumnProps {
  id: string;
  title: string;
  cards: { id: string; title: string; description: string }[]; // Adjust card type as needed
  color: "blue" | "yellow" | "purple" | "green"; // Limited color types
  moveCard: (item: any, columnId: string) => void; // Adjust item type as needed
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  id,
  title,
  cards,
  color,
  moveCard,
}) => {
  const dropRef = useRef<HTMLDivElement>(null); // Use ref to reference the drop target
  const [, drop] = useDrop({
    accept: "KANBAN_CARD",
    drop: (item) => moveCard(item, id),
  });

  // Attach the drop target ref
  drop(dropRef);

  return (
    <div ref={dropRef} className={styles.kanbanColumn}>
      <div
        className={`${styles.kanbanColumnHeader} ${styles[`kanbanColumnHeader${capitalize(color)}`]}`}
      >
        <h2 className={styles.kanbanColumnTitle}>{title}</h2>
        <span className={styles.kanbanColumnCount}>{cards.length}</span>
      </div>
      <div className={styles.kanbanColumnBody}>
        {cards.map((card) => (
          <KanbanCard key={card.id} {...card} moveCard={moveCard} />
        ))}
      </div>
    </div>
  );
};

// Helper function to capitalize the color string
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default KanbanColumn;
