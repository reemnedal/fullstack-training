import React, { useState } from "react";
import CardGrid from "../../organisms/CardGrid/CardGrid.jsx";
import "./tabs.css"; // Custom styles for the tabs (if any)
import TableView from "../../organisms/Table view/index.jsx";
import CalendarPage from "../../pages/calendar/index.jsx";
 import   KanbanBoardT   from "../../organisms/KanbanBoard/index.jsx";
 import { DndProvider } from 'react-dnd';
 import { HTML5Backend } from 'react-dnd-html5-backend';
const Tabs = () => {
  const [activeTab, setActiveTab] = useState("cards");

  const tabs = [
    { label: "Card Grid", key: "cards" },
    { label: "Table View", key: "table" },
    { label: "Calendar", key: "calendar" },
    { label: "Kanban View", key: "kanban" }
  ];

  return (
    <div className="tabs-container">
      {/* Tabs Navigation */}
      <div className="tabs-nav">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`tab-button ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="tab-content">
        {activeTab === "cards" && <CardGrid />}
        {activeTab === "table" && <TableView/ >}
        {activeTab === "calendar" &&  <CalendarPage/>}
        {activeTab === "kanban" &&    <DndProvider backend={HTML5Backend}>
      <div >
        <KanbanBoardT />
      </div>
    </DndProvider>}
      </div>
    </div>
  );
};

export default Tabs;
