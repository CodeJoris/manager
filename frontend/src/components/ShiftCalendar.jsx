import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function ShiftCalendar({ shifts, onAddShift, employees }) {
  const [events, setEvents] = useState(shifts);

  const handleSelect = (info) => {
    const employeeName = prompt("Assign to which employee?");
    if (!employeeName) return;

    const valid = employees.some(e => e.name.toLowerCase() === employeeName.toLowerCase());
    if (!valid) {
      alert("Employee not found in database.");
      return;
    }

    const newEvent = {
      title: employeeName,
      start: info.startStr,
      end: info.endStr,
      allDay: false,
    };
    setEvents([...events, newEvent]);
    onAddShift(newEvent);
  };

  return (
    <div className="mt-4">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
        initialView="timeGridWeek"
        selectable={true}
        editable={true}
        events={events}
        select={handleSelect}
        height="auto"
      />
    </div>
  );
}
