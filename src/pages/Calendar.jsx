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
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
  });
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
        selectedDate: "2025-01-07",
        plugins: [createEventModalPlugin(), createDragAndDropPlugin()],
      });

    // Function to handle the double click event on date cell
    const handleDateCellDoubleClick = (dateString) => {
        setSelectedDate(dateString);
        setEventData({ title: "", description: "" });
        setIsModalOpen(true);
    };

    // Add event listener to the calendar component
    useEffect(() => {
        if (calendarRef.current) {
            const calendarContainer = calendarRef.current.querySelector(".sx__calendar");
            calendarContainer.addEventListener('dblclick', (e) => {
              if (e.target.classList.contains('sx__grid-item-date')) {
                const dateString = e.target.getAttribute("data-date");
                handleDateCellDoubleClick(dateString)
                }
            });
        }
        return () => {
           if (calendarRef.current) {
            const calendarContainer = calendarRef.current.querySelector(".sx__calendar");
            calendarContainer.removeEventListener('dblclick', (e) => {
             if (e.target.classList.contains('sx__grid-item-date')) {
              const dateString = e.target.getAttribute("data-date");
              handleDateCellDoubleClick(dateString)
              }
            });
          }
        };
    }, []);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEvent = () => {
      if (selectedDate) {
           calendar.addEvent({
            id: Date.now(),
            title: eventData.title,
            start: `${selectedDate} 00:00`,
               end: `${selectedDate} 01:00`,
            description: eventData.description,
          });

      setIsModalOpen(false);
      }
    };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleDeleteEvent = () => {
    // Implement delete logic if editing an existing event.
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl"  ref={calendarRef}>
        <ScheduleXCalendar calendarApp={calendar}  />
      </div>
        {isModalOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                <div className="bg-white p-8 rounded-md shadow-xl">
                    <h2 className="text-xl font-bold mb-4">Add/Edit Event</h2>
                      {selectedDate &&
                        <p className="mb-4"> Selected Date: {selectedDate}</p>
                      }

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="title"
                          value={eventData.title}
                            onChange={handleInputChange}
                        />
                    </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="description"
                            value={eventData.description}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                            onClick={handleDeleteEvent}
                        >
                            Delete
                        </button>
                        <button
                          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleSaveEvent}
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
