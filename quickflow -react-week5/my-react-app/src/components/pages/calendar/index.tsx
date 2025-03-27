import React from "react";
import CalendarView from "../../organisms/CalendarView/index.jsx";

const CalendarPage = () => {
  // Sample events data
  const events = [
    {
      id: 1,
      title: "Team Meeting",
      date: new Date(2025, 2, 18), // March 18, 2025
      time: "10:00 AM - 11:30 AM",
      description: "Weekly team sync meeting",
      color: "#1e40af",
    },
    {
      id: 2,
      title: "Project Deadline",
      date: new Date(2025, 2, 20), // March 20, 2025
      time: "5:00 PM",
      description: "Submit final project deliverables",
      color: "#dc2626",
    },
    {
      id: 3,
      title: "Lunch with Client",
      date: new Date(2025, 2, 18), // March 18, 2025
      time: "12:30 PM - 2:00 PM",
      description: "Discuss new requirements",
      color: "#15803d",
    },
    {
      id: 4,
      title: "Review Session",
      date: new Date(2025, 2, 18), // March 18, 2025
      time: "3:00 PM - 4:00 PM",
      description: "Code review for new feature",
      color: "#7e22ce",
    },
    {
      id: 5,
      title: "Training Session",
      date: new Date(2025, 2, 22), // March 22, 2025
      time: "9:00 AM - 12:00 PM",
      description: "New tool training",
      color: "#ea580c",
    },
  ];

  const handleEventClick = (event) => {
    console.log("Event clicked:", event);
    // Handle event click (e.g., open modal with details)
  };

  const handleDateSelect = (date) => {
    console.log("Date selected:", date);
    // Handle date selection (e.g., allow creating new event)
  };

  return (
    <div className="calendar-page">
      <h1>Team Calendar</h1>
      <CalendarView
        events={events}
        onEventClick={handleEventClick}
        onDateSelect={handleDateSelect}
      />
    </div>
  );
};

export default CalendarPage;
