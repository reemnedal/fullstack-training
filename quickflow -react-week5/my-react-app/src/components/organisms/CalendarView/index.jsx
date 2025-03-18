import React, { useState, useEffect } from "react";
import Text from "../../atoms/Text/index.jsx";
import Button from "../../atoms/Button/index.jsx";
import "./calendar.css";

const CalendarView = ({ events = [], onEventClick, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', or 'day'
  
  // Get current month's days
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Get previous month's days that appear in current month view
  const getPreviousMonthDays = (year, month) => {
    const firstDay = getFirstDayOfMonth(year, month);
    const daysInPrevMonth = getDaysInMonth(year, month - 1);
    
    const prevMonthDays = [];
    for (let i = 0; i < firstDay; i++) {
      prevMonthDays.unshift({
        day: daysInPrevMonth - i,
        month: month - 1,
        year: month === 0 ? year - 1 : year,
        isCurrentMonth: false
      });
    }
    
    return prevMonthDays;
  };
  
  // Get current month's days
  const getCurrentMonthDays = (year, month) => {
    const daysInMonth = getDaysInMonth(year, month);
    const currentMonthDays = [];
    
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push({
        day: i,
        month,
        year,
        isCurrentMonth: true
      });
    }
    
    return currentMonthDays;
  };
  
  // Get next month's days that appear in current month view
  const getNextMonthDays = (year, month, totalCells) => {
    const firstDay = getFirstDayOfMonth(year, month);
    const daysInMonth = getDaysInMonth(year, month);
    const remainingCells = totalCells - (firstDay + daysInMonth);
    
    const nextMonthDays = [];
    for (let i = 1; i <= remainingCells; i++) {
      nextMonthDays.push({
        day: i,
        month: month === 11 ? 0 : month + 1,
        year: month === 11 ? year + 1 : year,
        isCurrentMonth: false
      });
    }
    
    return nextMonthDays;
  };
  
  // Get all days to display in the calendar grid
  const getAllDaysToDisplay = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalCells = 42; // 6 rows of 7 days
    
    const prevMonthDays = getPreviousMonthDays(year, month);
    const currentMonthDays = getCurrentMonthDays(year, month);
    const nextMonthDays = getNextMonthDays(year, month, totalCells - (prevMonthDays.length + currentMonthDays.length));
    
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };
  
  // Navigate to previous/next month
  const navigateToPreviousMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };
  
  const navigateToNextMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
  };
  
  const navigateToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };
  
  // Event handling
  const handleDateClick = (day) => {
    const newDate = new Date(day.year, day.month, day.day);
    setSelectedDate(newDate);
    if (onDateSelect) {
      onDateSelect(newDate);
    }
  };
  
  const handleEventClick = (event) => {
    if (onEventClick) {
      onEventClick(event);
    }
  };
  
  // Find events for a specific day
  const getEventsForDay = (day) => {
    if (!events || events.length === 0) return [];
    
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day.day &&
        eventDate.getMonth() === day.month &&
        eventDate.getFullYear() === day.year
      );
    });
  };
  
  // Format date to display in header
  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };
  
  // Render day cell
  const renderDayCell = (day) => {
    const dayEvents = getEventsForDay(day);
    const today = new Date();
    const isToday = 
      today.getDate() === day.day && 
      today.getMonth() === day.month && 
      today.getFullYear() === day.year;
    
    const isSelected = selectedDate && 
      selectedDate.getDate() === day.day && 
      selectedDate.getMonth() === day.month && 
      selectedDate.getFullYear() === day.year;
    
    return (
      <div 
        key={`${day.year}-${day.month}-${day.day}`}
        className={`calendar-day ${day.isCurrentMonth ? '' : 'other-month'} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
        onClick={() => handleDateClick(day)}
      >
        <div className="day-number">{day.day}</div>
        <div className="day-events">
          {dayEvents.slice(0, 3).map((event, idx) => (
            <div 
              key={idx} 
              className="calendar-event"
              style={{ backgroundColor: event.color || '#1e40af' }}
              onClick={(e) => {
                e.stopPropagation();
                handleEventClick(event);
              }}
            >
              <Text className="event-title">{event.title}</Text>
            </div>
          ))}
          {dayEvents.length > 3 && (
            <div className="more-events">+{dayEvents.length - 3} more</div>
          )}
        </div>
      </div>
    );
  };
  
  // Change view mode
  const changeViewMode = (mode) => {
    setViewMode(mode);
  };
  
  // Render week view
  const renderWeekView = () => {
    // Implementation for week view would go here
    // This is a placeholder
    return <div className="week-view">Week view coming soon</div>;
  };
  
  // Render day view
  const renderDayView = () => {
    // Implementation for day view would go here
    // This is a placeholder
    return <div className="day-view">Day view coming soon</div>;
  };
  
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-title">
          <Text className="month-year-title">{formatMonthYear(currentDate)}</Text>
        </div>
        <div className="calendar-controls">
          <div className="view-controls">
            <Button 
              text="Month" 
              className={`view-button ${viewMode === 'month' ? 'active' : ''}`}
              onClick={() => changeViewMode('month')}
            />
            <Button 
              text="Week" 
              className={`view-button ${viewMode === 'week' ? 'active' : ''}`}
              onClick={() => changeViewMode('week')}
            />
            <Button 
              text="Day" 
              className={`view-button ${viewMode === 'day' ? 'active' : ''}`}
              onClick={() => changeViewMode('day')}
            />
          </div>
          <div className="navigation-controls">
            <Button 
              text="Today" 
              className="today-button"
              onClick={navigateToToday}
            />
            <Button 
              text="<" 
              className="nav-button"
              onClick={navigateToPreviousMonth}
            />
            <Button 
              text=">" 
              className="nav-button"
              onClick={navigateToNextMonth}
            />
          </div>
        </div>
      </div>
      
      {viewMode === 'month' && (
        <div className="calendar-month-view">
          <div className="calendar-weekdays">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="weekday">
                <Text>{day}</Text>
              </div>
            ))}
          </div>
          <div className="calendar-days">
            {getAllDaysToDisplay().map(day => renderDayCell(day))}
          </div>
        </div>
      )}
      
      {viewMode === 'week' && renderWeekView()}
      {viewMode === 'day' && renderDayView()}
      
      {selectedDate && (
        <div className="calendar-details">
          <Text className="selected-date-header">
            {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric',
              year: 'numeric'
            })}
          </Text>
          <div className="selected-date-events">
            {getEventsForDay({
              day: selectedDate.getDate(),
              month: selectedDate.getMonth(),
              year: selectedDate.getFullYear()
            }).map((event, idx) => (
              <div 
                key={idx} 
                className="event-detail"
                onClick={() => handleEventClick(event)}
              >
                <div 
                  className="event-color-indicator"
                  style={{ backgroundColor: event.color || '#1e40af' }}
                ></div>
                <div className="event-info">
                  <Text className="event-detail-title">{event.title}</Text>
                  {event.time && <Text className="event-time">{event.time}</Text>}
                  {event.description && <Text className="event-description">{event.description}</Text>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;