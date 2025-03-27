import React, { forwardRef } from "react";
import Badge from "../../atoms/Badge/index";
import Avatar from "../../atoms/Avatar/index";
import styles from "./KanbanCard.module.css"; // CSS module import
import { useDrag } from "react-dnd";

// Defining the types for the component props
interface KanbanCardProps {
  id: string;
  title: string;
  description?: string;
  priority?: "High" | "Medium" | "Low";
  assignee?: { name: string; avatar: string };
  tags?: { color: string; text: string }[];
  moveCard: (item: any, columnId: string) => void;
}

const KanbanCard = forwardRef<HTMLDivElement, KanbanCardProps>(
  ({ id, title, description, priority, assignee, tags, moveCard }, ref) => {
    const [{ isDragging }, drag] = useDrag({
      type: "KANBAN_CARD",
      item: { id, title, description, priority, assignee, tags },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const opacity = isDragging ? 0.5 : 1;

    // Assign the drag ref to the div's ref
    React.useImperativeHandle(ref, () => drag as any, [drag]);

    return (
      <div
        ref={ref} // Using forwarded ref here
        className={styles.kanbanCard}
        style={{ opacity }}
      >
        <div className={styles.kanbanCardHeader}>
          <h3 className={styles.kanbanCardTitle}>{title}</h3>
          {priority && (
            <Badge
              color={
                priority === "High"
                  ? "red"
                  : priority === "Medium"
                    ? "yellow"
                    : "blue"
              }
            >
              {priority}
            </Badge>
          )}
        </div>
        {description && (
          <p className={styles.kanbanCardDescription}>{description}</p>
        )}
        <div className={styles.kanbanCardFooter}>
          <div className={styles.kanbanCardTags}>
            {tags &&
              tags.map((tag, index) => (
                <Badge
                  key={index}
                  color={
                    tag.color as
                      | "red"
                      | "blue"
                      | "green"
                      | "yellow"
                      | "purple"
                      | "default"
                  }
                >
                  {tag.text}
                </Badge>
              ))}
          </div>
          {assignee && <Avatar name={assignee.name} src={assignee.avatar} />}
        </div>
      </div>
    );
  },
);

export default KanbanCard;
