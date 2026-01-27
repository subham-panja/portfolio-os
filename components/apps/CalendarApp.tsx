"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Calendar as CalendarIcon,
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: Date;
  type: "work" | "project" | "life";
  description: string;
  color: string;
}

// Mock career events
const careerEvents: Event[] = [
  {
    id: "1",
    title: "Joined Spring Financial",
    date: new Date(2023, 2, 1), // March 2023
    type: "work",
    description: "Started role as Sr. Software Engineer",
    color: "#30D158",
  },
  {
    id: "2",
    title: "Bloom Paywall Launch",
    date: new Date(2023, 5, 15),
    type: "project",
    description: "Launched AI Paywall generating $50K ARR",
    color: "#0A84FF",
  },
  {
    id: "3",
    title: "Joined AtlasX",
    date: new Date(2022, 1, 1),
    type: "work",
    description: "Software Developer Role",
    color: "#BF5AF2",
  },
];

export default function CalendarApp() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );
  };

  const getEventsForDate = (day: number) => {
    return careerEvents.filter(
      (e) =>
        e.date.getDate() === day &&
        e.date.getMonth() === currentDate.getMonth() &&
        e.date.getFullYear() === currentDate.getFullYear(),
    );
  };

  const selectedEvents = selectedDate
    ? careerEvents.filter(
        (e) =>
          e.date.getDate() === selectedDate.getDate() &&
          e.date.getMonth() === selectedDate.getMonth() &&
          e.date.getFullYear() === selectedDate.getFullYear(),
      )
    : [];

  return (
    <div className="h-full flex flex-col md:flex-row bg-white/5 text-white">
      {/* Sidebar - Date & Events List */}
      <div className="w-full md:w-80 bg-black/20 p-6 flex flex-col border-r border-white/10">
        <div className="mb-8">
          <h2 className="text-4xl font-light mb-1">
            {selectedDate?.toLocaleDateString("en-US", { weekday: "long" })}
          </h2>
          <h1 className="text-6xl font-bold text-red-500">
            {selectedDate?.getDate()}
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          <h3 className="text-sm font-semibold uppercase text-white/50 mb-4 tracking-wider">
            Events
          </h3>
          {selectedEvents.length > 0 ? (
            <div className="space-y-4">
              {selectedEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white/10 p-4 rounded-xl border-l-4"
                  style={{ borderColor: event.color }}
                >
                  <h4 className="font-semibold text-lg">{event.title}</h4>
                  <p className="text-sm text-white/70 mt-1">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-white/50">
                    <span className="bg-white/10 px-2 py-1 rounded uppercase">
                      {event.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-white/30 text-center py-10">
              <p>No events for this day</p>
              <button
                onClick={() => {
                  // Find next event
                  const nextEvent = careerEvents.find(
                    (e) => e.date > (selectedDate || new Date()),
                  );
                  if (nextEvent) {
                    setCurrentDate(nextEvent.date);
                    setSelectedDate(nextEvent.date);
                  }
                }}
                className="mt-4 text-xs text-blue-400 hover:underline"
              >
                Jump to next career milestone
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Calendar Grid */}
      <div className="flex-1 p-8 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-white/10 rounded-full"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 hover:bg-white/10 rounded-lg text-sm"
            >
              Today
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-white/10 rounded-full"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-white/50 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 flex-1 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="bg-gray-900/50" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const date = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              day,
            );
            const isToday = new Date().toDateString() === date.toDateString();
            const isSelected =
              selectedDate?.toDateString() === date.toDateString();
            const dayEvents = getEventsForDate(day);

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(date)}
                className={`bg-gray-900/40 hover:bg-gray-800/60 p-2 relative flex flex-col items-center justify-start transition-colors
                            ${isSelected ? "bg-white/10" : ""}
                        `}
              >
                <span
                  className={`
                            w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium mb-1
                            ${isToday ? "bg-red-500 text-white" : "text-white/90"}
                        `}
                >
                  {day}
                </span>

                <div className="w-full flex flex-col gap-1 px-1">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="w-full h-1.5 rounded-full"
                      style={{ backgroundColor: event.color }}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
