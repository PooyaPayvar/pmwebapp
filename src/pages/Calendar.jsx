import React, { useState, useRef, useEffect } from "react";
import "./calendar.css";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import { createViewWeek, createViewMonthGrid } from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";

function Calendar() {
  const calendarRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventData, setEventData] = useState({ title: "", description: "" });

  const calendar = useCalendarApp({
    views: [createViewWeek(), createViewMonthGrid()],
    events: [
      {
        id: 1,
        title: "Sanding Lubrication",
        start: "2025-01-07 00:00",
        end: "2025-01-07 02:00",
        description: "Push Feeder Need Lubrication",
      },
    ],
    selectedDate: "2025-01-07", // Ensure this date corresponds to your event
    plugins: [createEventModalPlugin(), createDragAndDropPlugin()],
  });

  // Function to handle the double click event on date cell
  const handleDateCellDoubleClick = (dateString) => {
    console.log("Opening modal for:", dateString);
    setSelectedDate(dateString);
    setEventData({ title: "", description: "" });
    setIsModalOpen(true);
  };
  // Add event listener to the calendar component
  useEffect(() => {
    const calendarContainer =
      calendarRef.current?.querySelector(".sx__calendar");

    const handleDoubleClick = (e) => {
      console.log("Element clicked:", e.target); // Check the clicked element
      if (e.target.classList.contains("sx__grid-item-date")) {
        const dateString = e.target.getAttribute("data-date");
        console.log("Double-clicked date:", dateString); // Log the double-clicked date
        handleDateCellDoubleClick(dateString);
      }
    };

    calendarContainer?.addEventListener("dblclick", handleDoubleClick);

    return () => {
      calendarContainer?.removeEventListener("dblclick", handleDoubleClick);
    };
  }, [calendarRef]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSaveEvent = () => {
    console.log("Saving event:", selectedDate, eventData);
    if (selectedDate && eventData.title) {
      console.log("Event will be added");
      calendar.addEvent({
        id: Date.now(),
        title: eventData.title,
        start: `${selectedDate}T00:00:00`, // Starting at the beginning of the day
        end: `${selectedDate}T01:00:00`, // Ending one hour later
        description: eventData.description,
      });
      setIsModalOpen(false); // Close the modal after saving
    } else {
      console.error("Cannot save event: missing selectedDate or title.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl"
        ref={calendarRef}
      >
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">Add/Edit Event</h2>
            {selectedDate && <p>Selected Date: {selectedDate}</p>}
            <div>
              <label className="block mb-2">Title</label>
              <input
                className="border rounded w-full py-2 px-3"
                name="title"
                value={eventData.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2">Description</label>
              <textarea
                className="border rounded w-full py-2 px-3"
                name="description"
                value={eventData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseModal}
                className="mr-2 bg-gray-400 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEvent}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Calendar;
