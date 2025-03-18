import React, { useState } from 'react';
import KanbanColumn from '../../molecules/KanbanColumn/index.jsx';
import './KanbanBoard.css';

const KanbanBoardT = () => {
  const [columns, setColumns] = useState([
    {
      id: 'todo',
      title: 'To Do',
      color: 'blue',
      cards: [
        {
          id: 1,
          title: 'Research competitors',
          description: 'Analyze top 5 competitors in the market',
          priority: 'Medium',
          assignee: { name: 'Alex Smith' },
          tags: [{ text: 'Research', color: 'blue' }],
        },
        {
          id: 2,
          title: 'Design homepage',
          description: 'Create wireframes for the homepage',
          priority: 'High',
          assignee: { name: 'Jamie Lee' },
          tags: [{ text: 'Design', color: 'purple' }],
        },
      ],
    },
    {
      id: 'inProgress',
      title: 'In Progress',
      color: 'yellow',
      cards: [
        {
          id: 3,
          title: 'Implement authentication',
          description: 'Set up user login and registration',
          priority: 'High',
          assignee: { name: 'Pat Johnson' },
          tags: [{ text: 'Backend', color: 'green' }],
        },
      ],
    },
    {
      id: 'review',
      title: 'In Review',
      color: 'purple',
      cards: [
        {
          id: 4,
          title: 'Fix navigation bug',
          description: 'Mobile navigation not working correctly',
          priority: 'Medium',
          assignee: { name: 'Riley Brown' },
          tags: [
            { text: 'Bug', color: 'red' },
            { text: 'Frontend', color: 'yellow' },
          ],
        },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      color: 'green',
      cards: [
        {
          id: 5,
          title: 'Project setup',
          description: 'Initialize repository and setup CI/CD',
          priority: 'Low',
          assignee: { name: 'Taylor Garcia' },
          tags: [{ text: 'DevOps', color: 'blue' }],
        },
      ],
    },
  ]);

  const moveCard = (card, toColumnId) => {
    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((column) => {
        if (column.id === toColumnId) {
          return { ...column, cards: [...column.cards, card] };
        }
        return {
          ...column,
          cards: column.cards.filter((item) => item.id !== card.id),
        };
      });
      return newColumns;
    });
  };

  return (
    <div className="kanban-board">
      <header className="kanban-board-header">
        <div className="kanban-board-header-content">
          <h1 className="kanban-board-title">Project Board</h1>
          <button className="kanban-board-add-button">Add Task</button>
        </div>
      </header>
      <div className="kanban-board-columns">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            cards={column.cards}
            color={column.color}
            moveCard={moveCard}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoardT;
