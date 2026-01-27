"use client";

import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  CloudSun,
  Thermometer,
  Droplets,
} from "lucide-react";

export default function WeatherApp() {
  // Mock data - in a real app this would fetch from OpenWeatherMap etc.
  const current = {
    temp: 72,
    condition: "Partly Cloudy",
    high: 76,
    low: 65,
    wind: 8,
    humidity: 45,
    location: "Cupertino, CA",
  };

  const forecast = [
    { day: "Today", icon: <CloudSun size={24} />, min: 65, max: 76 },
    {
      day: "Tue",
      icon: <Sun size={24} className="text-yellow-400" />,
      min: 68,
      max: 82,
    },
    {
      day: "Wed",
      icon: <Sun size={24} className="text-yellow-400" />,
      min: 70,
      max: 85,
    },
    { day: "Thu", icon: <Cloud size={24} />, min: 66, max: 78 },
    {
      day: "Fri",
      icon: <CloudRain size={24} className="text-blue-400" />,
      min: 62,
      max: 70,
    },
  ];

  return (
    <div className="h-full w-full bg-gradient-to-b from-[#1E3A5F] to-[#0B1221] text-white p-6 flex flex-col items-center">
      {/* City & Condition */}
      <div className="text-center mt-4">
        <h2 className="text-3xl font-medium tracking-wide">
          {current.location}
        </h2>
        <div className="text-8xl font-thin mt-2 flex items-start justify-center ml-4">
          {current.temp}
          <span className="text-4xl mt-2">°</span>
        </div>
        <div className="text-xl font-medium text-blue-200 mt-1">
          {current.condition}
        </div>
        <div className="flex gap-4 justify-center mt-1 text-lg">
          <span>H:{current.high}°</span>
          <span>L:{current.low}°</span>
        </div>
      </div>

      {/* Details Grid */}
      <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-sm">
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md flex flex-col items-center justify-center gap-2">
          <Wind className="text-white/60" size={20} />
          <span className="text-sm text-white/60">Wind</span>
          <span className="font-semibold">{current.wind} mph</span>
        </div>
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md flex flex-col items-center justify-center gap-2">
          <Droplets className="text-white/60" size={20} />
          <span className="text-sm text-white/60">Humidity</span>
          <span className="font-semibold">{current.humidity}%</span>
        </div>
      </div>

      {/* Forecast */}
      <div className="mt-6 bg-white/10 rounded-2xl p-4 backdrop-blur-md w-full max-w-sm flex-1">
        <h3 className="text-xs uppercase font-medium text-white/50 mb-4 flex items-center gap-1">
          <CalendarIcon size={12} /> 5-DAY FORECAST
        </h3>
        <div className="flex flex-col gap-4">
          {forecast.map((day, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="w-12 font-medium">{day.day}</div>
              <div className="flex-1 flex justify-center">{day.icon}</div>
              <div className="flex gap-4 w-24 justify-end text-sm">
                <span className="text-white/60">{day.min}°</span>

                {/* Temperature Bar */}
                <div className="w-16 h-1 bg-white/20 rounded-full my-auto relative overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 bg-gradient-to-r from-blue-300 to-yellow-300 w-full"
                    style={{
                      left: "10%",
                      right: "10%",
                    }}
                  />
                </div>

                <span className="font-medium">{day.max}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CalendarIcon({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}
