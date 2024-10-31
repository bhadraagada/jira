import { useState } from "react";
import {
  format,
  getDay,
  parse,
  startOfWeek,
  addMonths,
  subMonths
} from "date-fns";
import {enUS} from "date-fns/locale/en-US";
import { Calendar, dateFnsLocalizer} from "react-big-calendar"

import { Task } from "../types";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./data-calendar.css";
import { EventCard } from "./event-card";


const locales = {
  "en-US": enUS
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

interface DataCalendarProps {
  data: Task[];
}

export const DataCalendar = ({ data }: DataCalendarProps) => {
  const [value, setValue] = useState(
    data.length > 0 ? new Date(data[0].dueDate) : new Date()
  )

  const events = data.map((task) => ({
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    title: task.name,
    project: task.project.name,
    assignee: task.assignee.name,
    status: task.status,
    id: task.$id,
  }))

  const handleNavigate = (actions: "PREV" | "NEXT" | "TODAY") => {
    if (actions === "PREV") {
      setValue(subMonths(value, 1))
    } else if (actions === "NEXT") {
      setValue(addMonths(value, 1))
    } else {
      setValue(new Date())
    }
  }

  return (
    <Calendar 
      localizer={localizer}
      date={value}
      events={events}
      views={["month"]}
      defaultView="month"
      toolbar={true}
      showAllEvents={true}
      className="h-full"
      max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
      formats={{
        weekdayFormat: (date, culture, localizer) => localizer?.format(date, "EEEE", culture) ?? "",
        
      }}
      components={{
        eventWrapper: ({ event} ) => (
          <EventCard 
            id={event.id} 
            title={event.title} 
            assignee={event.assignee} 
            project={event.project} 
            status={event.status}
            
          />
        )
      }}
    />
  )
}