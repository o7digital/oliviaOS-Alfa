"use client";

import { useEffect, useState } from "react";

export default function ControlCenter() {
  const [score, setScore] = useState(87);
  const [revenue, setRevenue] = useState(1240000);
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    const seed = [
      "New enterprise deal detected",
      "High-value relationship signal",
      "Hostess qualified premium lead",
      "Risk detected in strategic account",
      "Human engagement spike",
    ];

    const interval = setInterval(() => {
      setScore((prev) => Math.min(100, prev + (Math.random() > 0.5 ? 1 : -1)));
      setRevenue((prev) => prev + Math.floor(Math.random() * 20000));

      const event = seed[Math.floor(Math.random() * seed.length)];
      setEvents((prev) => [event, ...prev.slice(0, 5)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black px-6 py-12 text-white lg:px-16">
      <div className="mb-12 text-4xl font-semibold">Olivia One Control Center</div>

      <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
        <div className="rounded-3xl bg-[#111] p-8 shadow-xl lg:p-10">
          <div className="mb-4 text-sm text-gray-400 uppercase">
            Global Relationship Index
          </div>
          <div className="text-6xl font-bold text-[#FF2F7D]">{score}%</div>
        </div>

        <div className="rounded-3xl bg-[#111] p-8 shadow-xl lg:p-10">
          <div className="mb-4 text-sm text-gray-400 uppercase">
            Projected Revenue
          </div>
          <div className="text-4xl font-semibold lg:text-5xl">
            ${revenue.toLocaleString()}
          </div>
        </div>

        <div className="rounded-3xl bg-[#111] p-8 shadow-xl lg:p-10">
          <div className="mb-4 text-sm text-gray-400 uppercase">
            Hostess Conversion
          </div>
          <div className="text-5xl font-semibold">72%</div>
        </div>
      </div>

      <div className="mt-16 rounded-3xl bg-[#111] p-8 shadow-xl lg:p-10">
        <div className="mb-6 text-sm text-gray-400 uppercase">
          Live Intelligence Feed
        </div>

        <div className="space-y-3">
          {events.map((event, index) => (
            <div
              key={`${event}-${index}`}
              className="animate-pulse border-l-4 border-[#FF2F7D] pl-4"
            >
              {event}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
