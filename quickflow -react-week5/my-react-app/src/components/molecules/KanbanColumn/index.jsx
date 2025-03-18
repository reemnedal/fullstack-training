import React from 'react';
import KanbanCard from '../KanbanCard/index.jsx';
import './KanbanColumn.css';

import { useDrop } from 'react-dnd';
 
const KanbanColumn = ({ id, title, cards, color, moveCard }) => {
  const [, drop] = useDrop({
    accept: 'KANBAN_CARD',
    drop: (item) => moveCard(item, id),
  });

  return (
    <div ref={drop} className="kanban-column">
      <div className={`kanban-column-header kanban-column-header-${color}`}>
        <h2 className="kanban-column-title">{title}</h2>
        <span className="kanban-column-count">{cards.length}</span>
      </div>
      <div className="kanban-column-body">
        {cards.map((card, index) => (
          <KanbanCard key={card.id} {...card} moveCard={moveCard} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
