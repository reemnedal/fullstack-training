import React, { useState } from "react";
import CardGrid from "../../organisms/CardGrid/CardGrid";
import TableView from "../../organisms/Table view/index";
import CalendarPage from "../../pages/calendar";
import KanbanBoardT from "../../organisms/KanbanBoard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./tabs.module.css"; // Import CSS module

interface Tab {
  label: string;
  key: string;
}

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("cards");

  const tabs: Tab[] = [
    { label: "Card Grid", key: "cards" },
    { label: "Table View", key: "table" },
    { label: "Calendar", key: "calendar" },
    { label: "Kanban View", key: "kanban" },
  ];

  return (
    <div className={styles.tabsContainer}>
      {" "}
      {/* Apply CSS module class */}
      {/* Tabs Navigation */}
      <div className={styles.tabsNav}>
        {" "}
        {/* Apply CSS module class */}
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`${styles.tabButton} ${activeTab === tab.key ? styles.active : ""}`} // Apply CSS module classes
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tabs Content */}
      <div className={styles.tabContent}>
        {" "}
        {/* Apply CSS module class */}
        {activeTab === "cards" && <CardGrid />}
        {activeTab === "table" && <TableView />}
        {activeTab === "calendar" && <CalendarPage />}
        {activeTab === "kanban" && (
          <DndProvider backend={HTML5Backend}>
            <div>
              <KanbanBoardT />
            </div>
          </DndProvider>
        )}
      </div>
    </div>
  );
};

export default Tabs;
