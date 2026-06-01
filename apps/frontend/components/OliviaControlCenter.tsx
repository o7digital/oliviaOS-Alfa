"use client";

import React, { useEffect, useState } from "react";
import { Activity, AlertTriangle, Brain, Mail, Shield } from "lucide-react";

const heroSlides = [
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1465446751832-9f11e2b3b8a3?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80",
];

export default function OliviaControlCenter() {
  const [liveEvents, setLiveEvents] = useState<string[]>([]);
  const [executiveMode, setExecutiveMode] = useState(false);

  useEffect(() => {
    const events = [
      "New Business Email Received",
      "High Intent Signal Detected",
      "Relationship Risk Increased",
      "Opportunity Score +8%",
      "Human Engagement Rising",
    ];

    const interval = setInterval(() => {
      setLiveEvents((prev) => [
        events[Math.floor(Math.random() * events.length)],
        ...prev.slice(0, 4),
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <section className="relative h-[90vh] overflow-hidden">
        <HeroSlider />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="relative max-w-4xl rounded-[32px] bg-black/60 p-8 text-center text-white shadow-[0_40px_120px_rgba(0,0,0,0.4)] backdrop-blur-xl lg:rounded-[40px] lg:p-16">
            <div className="mb-6 text-sm tracking-widest text-white/70 uppercase">
              Olivia One Control Center
            </div>

            <h1 className="mb-6 text-5xl font-semibold lg:text-6xl">
              Relationship Operating System
            </h1>

            <p className="mb-10 text-lg text-white/80">
              Transform emails, conversations and human signals into strategic
              intelligence.
            </p>

            <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
              <button
                onClick={() => setExecutiveMode(!executiveMode)}
                className="rounded-full bg-[#FF2F7D] px-8 py-4 text-white"
              >
                Toggle Executive Mode
              </button>

              <a
                href="/inbox"
                className="rounded-full border border-white px-8 py-4 text-white"
              >
                Open Olivia One Inbox
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3 lg:gap-12">
          <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-xl lg:rounded-[40px] lg:p-12">
            <div className="mb-4 text-sm text-gray-400 uppercase">
              Global Relationship Index
            </div>
            <div className="mb-6 text-5xl font-semibold text-[#FF2F7D]">
              87%
            </div>
            <div className="space-y-2 text-sm">
              <div>Business Momentum: +12%</div>
              <div>Human Trust Level: Strong</div>
              <div>Risk Exposure: Moderate</div>
            </div>
          </div>

          <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-xl lg:rounded-[40px] lg:p-12">
            <div className="mb-6 flex items-center gap-3">
              <Activity className="text-[#FF2F7D]" />
              <div className="text-sm text-gray-400 uppercase">
                Live Intelligence Feed
              </div>
            </div>

            <div className="space-y-3 text-sm">
              {liveEvents.map((event, index) => (
                <div
                  key={`${event}-${index}`}
                  className="animate-pulse border-l-4 border-[#FF2F7D] pl-4"
                >
                  {event}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-xl lg:rounded-[40px] lg:p-12">
            <div className="mb-6 flex items-center gap-3">
              <Brain className="text-[#FF2F7D]" />
              <div className="text-sm text-gray-400 uppercase">
                Executive Radar
              </div>
            </div>

            {executiveMode ? (
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-red-500">
                  <AlertTriangle size={16} />
                  Critical Relationship Detected
                </div>
                <div>Top Opportunity: 72% Close Probability</div>
                <div>Client Risk Increase: +14%</div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                Executive insights available in Executive Mode.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#F9F9FB] px-6 py-20 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 text-center md:grid-cols-3 lg:gap-12">
          <ModuleCard
            icon={<Mail size={28} />}
            title="Olivia One"
            description="Inbox intelligence layer analyzing relational signals."
            link="/inbox"
          />

          <ModuleCard
            icon={<Shield size={28} />}
            title="Olivia Hostess"
            description="Captures and qualifies inbound interactions."
          />

          <ModuleCard
            icon={<Activity size={28} />}
            title="o7 CRM Pulse"
            description="Transforms signals into structured revenue execution."
          />
        </div>
      </section>
    </div>
  );
}

function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0">
      {heroSlides.map((src, slideIndex) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            slideIndex === index ? "opacity-100" : "opacity-0"
          }`}
          alt=""
        />
      ))}
    </div>
  );
}

function ModuleCard({
  icon,
  title,
  description,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
}) {
  return (
    <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-xl lg:rounded-[40px] lg:p-10">
      <div className="mb-6 text-[#FF2F7D]">{icon}</div>
      <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
      <p className="mb-6 text-gray-500">{description}</p>
      {link ? (
        <a href={link} className="font-medium text-[#FF2F7D]">
          Open Module
        </a>
      ) : null}
    </div>
  );
}
