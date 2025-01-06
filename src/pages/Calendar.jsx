import React, { useState, useRef } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createViewMonthGrid, createViewWeek } from "@schedule-x/calendar";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import moment from "moment-jalaali"; // Import moment-jalaali for Persian calendar

import "./calendar.css";
import "@schedule-x/theme-default/dist/index.css";

function Calendar() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "My New Event",
      start: "2025-01-06 00:00",
      end: "2025-01-06 00:00",
      description: "My Cool",
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("edit"); // 'edit' or 'create'
  const modalRef = useRef(null);

  const calendarApp = useCalendarApp({
    views: [createViewWeek(), createViewMonthGrid()],
    events: events,
    selectedDate: "2025-01-01",
    plugins: [createEventModalPlugin(), createDragAndDropPlugin()],
    onEventClick: (args) => {
      setSelectedEvent(args.event);
      setModalMode("edit");
      setShowModal(true);
    },
  });

  const handleDateSelect = (args) => {
    const newEvent = {
      id: events.length + 1, // Generate a new unique id
      title: "",
      start: moment(args.date).format("YYYY-MM-DD HH:mm"),
      end: moment(args.date).format("YYYY-MM-DD HH:mm"),
      description: "",
    };
    setSelectedEvent(newEvent);
    setModalMode("create");
    setShowModal(true);
  };

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    setShowModal(false);
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
    setShowModal(false);
  };

  const editEvent = (updatedEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    setShowModal(false);
  };

  const saveNewEvent = () => {
    if (modalMode === "create" && selectedEvent) {
      addEvent(selectedEvent);
    } else if (modalMode === "edit" && selectedEvent) {
      editEvent(selectedEvent);
    }
  };

  const convertToJalaali = (date) => {
    return moment(date).format("jYYYY/jMM/jDD");
  };

  return (
    <div>
      <ScheduleXCalendar
        calendarApp={calendarApp}
        enableDateSelection={true}
        onDateSelect={handleDateSelect}
      />
      <div className="flex gap-4 mt-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() =>
            addEvent({
              id: events.length + 1,
              title: "New Event",
              start: convertToJalaali("2025-01-07 00:00"),
              end: convertToJalaali("2025-01-07 00:00"),
              description: "New Event Description",
            })
          }
        >
          Add Event
        </button>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          ref={modalRef}
        >
          <div className="bg-white p-4 rounded w-1/2">
            <h2 className="text-xl mb-4">
              {modalMode === "edit" ? "Edit Event" : "Create Event"}
            </h2>
            <input
              type="text"
              value={selectedEvent?.title || ""} // Use || '' to handle null or undefined
              onChange={(e) =>
                setSelectedEvent({ ...selectedEvent, title: e.target.value })
              }
              className="border border-gray-300 p-2 rounded w-full mb-4"
            />
            <textarea
              value={selectedEvent?.description || ""} // Use || '' to handle null or undefined
              onChange={(e) =>
                setSelectedEvent({
                  ...selectedEvent,
                  description: e.target.value,
                })
              }
              className="border border-gray-300 p-2 rounded w-full mb-4"
            />
            <div className="flex justify-end">
              {modalMode === "edit" && (
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                  onClick={() => deleteEvent(selectedEvent.id)}
                >
                  Delete
                </button>
              )}
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={saveNewEvent}
              >
                {modalMode === "edit" ? "Save" : "Create"}
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 ml-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
