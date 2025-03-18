import React from 'react';
import Badge from '../../atoms/Badge/index.jsx';
import Avatar from '../../atoms/Avatar/index.jsx';
import './KanbanCard.css';
  import { useDrag } from 'react-dnd';


const KanbanCard = ({ id, title, description, priority, assignee, tags, moveCard }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'KANBAN_CARD',
    item: { id, title, description, priority, assignee, tags },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div
      ref={drag}
      className="kanban-card"
      style={{ opacity }}
    >
      <div className="kanban-card-header">
        <h3 className="kanban-card-title">{title}</h3>
        {priority && <Badge color={priority === 'High' ? 'red' : priority === 'Medium' ? 'yellow' : 'blue'}>{priority}</Badge>}
      </div>
      {description && <p className="kanban-card-description">{description}</p>}
      <div className="kanban-card-footer">
        <div className="kanban-card-tags">
          {tags && tags.map((tag, index) => (
            <Badge key={index} color={tag.color}>{tag.text}</Badge>
          ))}
        </div>
        {assignee && <Avatar name={assignee.name} src={assignee.avatar} />}
      </div>
    </div>
  );
};

export default KanbanCard;
