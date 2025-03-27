import React, { useState, useEffect } from "react";
import Text from "../../atoms/Text";
import Button from "../../atoms/Button";
import styles from "./calendar.module.css";

// Define types for event and props
interface Event {
  date: string;
  title: string;
  time?: string;
  description?: string;
  color?: string;
}

interface CalendarViewProps {
  events?: Event[];
  onEventClick?: (event: Event) => void;
  onDateSelect?: (date: Date) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  events = [],
  onEventClick,
  onDateSelect,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const getPreviousMonthDays = (year: number, month: number) => {
    const firstDay = getFirstDayOfMonth(year, month);
    const daysInPrevMonth = getDaysInMonth(year, month - 1);

    const prevMonthDays = [];
    for (let i = 0; i < firstDay; i++) {
      prevMonthDays.unshift({
        day: daysInPrevMonth - i,
        month: month - 1,
        year: month === 0 ? year - 1 : year,
        isCurrentMonth: false,
      });
    }

    return prevMonthDays;
  };

  const getCurrentMonthDays = (year: number, month: number) => {
    const daysInMonth = getDaysInMonth(year, month);
    const currentMonthDays = [];

    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push({
        day: i,
        month,
        year,
        isCurrentMonth: true,
      });
    }

    return currentMonthDays;
  };

  const getNextMonthDays = (
    year: number,
    month: number,
    totalCells: number,
  ) => {
    const firstDay = getFirstDayOfMonth(year, month);
    const daysInMonth = getDaysInMonth(year, month);
    const remainingCells = totalCells - (firstDay + daysInMonth);

    const nextMonthDays = [];
    for (let i = 1; i <= remainingCells; i++) {
      nextMonthDays.push({
        day: i,
        month: month === 11 ? 0 : month + 1,
        year: month === 11 ? year + 1 : year,
        isCurrentMonth: false,
      });
    }

    return nextMonthDays;
  };

  const getAllDaysToDisplay = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalCells = 42; // 6 rows of 7 days

    const prevMonthDays = getPreviousMonthDays(year, month);
    const currentMonthDays = getCurrentMonthDays(year, month);
    const nextMonthDays = getNextMonthDays(
      year,
      month,
      totalCells - (prevMonthDays.length + currentMonthDays.length),
    );

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  const navigateToPreviousMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };

  const navigateToNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
  };

  const navigateToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const handleDateClick = (day: any) => {
    const newDate = new Date(day.year, day.month, day.day);
    setSelectedDate(newDate);
    if (onDateSelect) {
      onDateSelect(newDate);
    }
  };

  const handleEventClick = (event: Event) => {
    if (onEventClick) {
      onEventClick(event);
    }
  };

  const getEventsForDay = (day: any) => {
    if (!events || events.length === 0) return [];

    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day.day &&
        eventDate.getMonth() === day.month &&
        eventDate.getFullYear() === day.year
      );
    });
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const renderDayCell = (day: any) => {
    const dayEvents = getEventsForDay(day);
    const today = new Date();
    const isToday =
      today.getDate() === day.day &&
      today.getMonth() === day.month &&
      today.getFullYear() === day.year;

    const isSelected =
      selectedDate &&
      selectedDate.getDate() === day.day &&
      selectedDate.getMonth() === day.month &&
      selectedDate.getFullYear() === day.year;

    return (
      <div
        key={`${day.year}-${day.month}-${day.day}`}
        className={`${styles.calendarDay} ${day.isCurrentMonth ? "" : styles.otherMonth} ${isToday ? styles.today : ""} ${isSelected ? styles.selected : ""}`}
        onClick={() => handleDateClick(day)}
      >
        <div className={styles.dayNumber}>{day.day}</div>
        <div className={styles.dayEvents}>
          {dayEvents.slice(0, 3).map((event, idx) => (
            <div
              key={idx}
              className={styles.calendarEvent}
              style={{ backgroundColor: event.color || "#1e40af" }}
              onClick={(e) => {
                e.stopPropagation();
                handleEventClick(event);
              }}
            >
              <Text className={styles.eventTitle}>{event.title}</Text>
            </div>
          ))}
          {dayEvents.length > 3 && (
            <div className={styles.moreEvents}>
              +{dayEvents.length - 3} more
            </div>
          )}
        </div>
      </div>
    );
  };

  const changeViewMode = (mode: "month" | "week" | "day") => {
    setViewMode(mode);
  };

  const renderWeekView = () => {
    return <div className={styles.weekView}>Week view coming soon</div>;
  };

  const renderDayView = () => {
    return <div className={styles.dayView}>Day view coming soon</div>;
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        <div className={styles.calendarTitle}>
          <Text className={styles.monthYearTitle}>
            {formatMonthYear(currentDate)}
          </Text>
        </div>
        <div className={styles.calendarControls}>
          <div className={styles.viewControls}>
            <Button
              text="Month"
              className={`${styles.viewButton} ${viewMode === "month" ? styles.active : ""}`}
              onClick={() => changeViewMode("month")}
            />
            <Button
              text="Week"
              className={`${styles.viewButton} ${viewMode === "week" ? styles.active : ""}`}
              onClick={() => changeViewMode("week")}
            />
            <Button
              text="Day"
              className={`${styles.viewButton} ${viewMode === "day" ? styles.active : ""}`}
              onClick={() => changeViewMode("day")}
            />
          </div>
          <div className={styles.navigationControls}>
            <Button
              text="Today"
              className={styles.todayButton}
              onClick={navigateToToday}
            />
            <Button
              text="<"
              className={styles.navButton}
              onClick={navigateToPreviousMonth}
            />
            <Button
              text=">"
              className={styles.navButton}
              onClick={navigateToNextMonth}
            />
          </div>
        </div>
      </div>

      {viewMode === "month" && (
        <div className={styles.calendarMonthView}>
          <div className={styles.calendarWeekdays}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className={styles.weekday}>
                <Text>{day}</Text>
              </div>
            ))}
          </div>
          <div className={styles.calendarDays}>
            {getAllDaysToDisplay().map((day) => renderDayCell(day))}
          </div>
        </div>
      )}

      {viewMode === "week" && renderWeekView()}
      {viewMode === "day" && renderDayView()}
    </div>
  );
};

export default CalendarView;
