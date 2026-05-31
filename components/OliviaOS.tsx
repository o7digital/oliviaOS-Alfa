"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Circle, Command } from "lucide-react";

const easePremium = [0.22, 1, 0.36, 1] as const;

export default function OliviaOne() {
  const [selected, setSelected] = useState(0);
  const [message, setMessage] = useState("");
  const [selectedDay, setSelectedDay] = useState(15);
  const [focusMode, setFocusMode] = useState(false);
  const [showCommand, setShowCommand] = useState(false);
  const [newMailGlow, setNewMailGlow] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowCommand((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNewMailGlow(true);
      setTimeout(() => setNewMailGlow(false), 2500);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const emails = [
    {
      from: "Andrew Miller",
      deal: "$120k pipeline",
      stage: "Hot Opportunity",
      content:
        "We are ready to move forward pending final pricing validation. Please share the updated enterprise agreement by EOD.",
    },
    {
      from: "Sofia Ramirez",
      deal: "$45k expansion",
      stage: "Executive Review",
      content:
        "The board has reviewed the proposal. We would like to schedule a strategic alignment call this week.",
    },
  ];

  const days = [14, 15, 16, 17];

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-[#0F1117] via-[#131722] to-[#1A1F2E] text-[#E6E8EE]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-[#8B9CFF]/15 blur-[220px]" />
        <div className="absolute right-1/3 bottom-1/4 h-[700px] w-[700px] rounded-full bg-[#4F5DFF]/10 blur-[160px]" />
      </div>

      <div className="relative z-10 flex items-center justify-between border-b border-[#22283A] bg-[#121622]/80 px-16 py-8 backdrop-blur-2xl">
        <div>
          <span className="text-2xl font-semibold text-[#8B9CFF]">
            o7 Olivia One
          </span>
          <div className="mt-1 text-xs tracking-[0.3em] text-[#6C738F] uppercase">
            Revenue Intelligence Workspace
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs text-[#6C738F]">
            <Circle
              size={8}
              className="animate-pulse fill-emerald-500 text-emerald-500"
            />
            Live Sync
          </div>

          <button
            onClick={() => setFocusMode(!focusMode)}
            className="rounded-full bg-[#8B9CFF] px-6 py-3 text-xs text-[#0F1117] transition hover:opacity-90"
          >
            {focusMode ? "Exit Focus" : "Ultra Focus"}
          </button>

          <div className="flex items-center gap-2 text-xs text-[#8B9CFF]">
            <Command size={14} /> ⌘K
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-1">
        <div className="w-80 border-r border-[#22283A] bg-[#121622]/60 p-10 backdrop-blur-xl">
          <h2 className="mb-8 text-xs tracking-[0.3em] text-[#6C738F] uppercase">
            Calendar
          </h2>
          {days.map((day) => (
            <motion.div
              key={day}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.35, ease: easePremium }}
              onClick={() => setSelectedDay(day)}
              className={`mb-5 cursor-pointer rounded-3xl p-6 ${
                selectedDay === day
                  ? "border border-[#2C3450] bg-[#1F2435] shadow-xl"
                  : "bg-[#151A28] hover:bg-[#1B2133]"
              }`}
            >
              <div className="text-lg font-medium">April {day}</div>
              <div className="mt-2 text-xs text-[#6C738F]">
                5 strategic meetings
              </div>
            </motion.div>
          ))}
        </div>

        {!focusMode && (
          <div className="w-96 border-r border-[#22283A] bg-[#121622]/60 p-10 backdrop-blur-xl">
            <h2 className="mb-8 text-xs tracking-[0.3em] text-[#6C738F] uppercase">
              Deal Intelligence
            </h2>
            {emails.map((mail, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.35, ease: easePremium }}
                onClick={() => setSelected(i)}
                className={`relative mb-6 rounded-3xl p-7 ${
                  selected === i
                    ? "border border-[#2C3450] bg-[#1F2435] shadow-xl"
                    : "bg-[#151A28] hover:bg-[#1B2133]"
                }`}
              >
                {i === 0 && newMailGlow && (
                  <div className="absolute inset-0 rounded-3xl bg-[#8B9CFF]/25 blur-2xl animate-pulse" />
                )}

                <div className="relative z-10">
                  <div className="font-medium">{mail.from}</div>
                  <div className="mt-2 text-xs text-[#8B9CFF]">{mail.stage}</div>
                  <div className="mt-1 text-xs text-[#6C738F]">{mail.deal}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex flex-1 flex-col bg-[#0F1117]/80 p-20">
          <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col">
            <div className="mb-16">
              <h1 className="text-4xl font-semibold text-[#8B9CFF]">
                Strategic Conversation
              </h1>
              <p className="mt-10 text-lg leading-relaxed text-[#A3AAC2]">
                {emails[selected].content}
              </p>
            </div>

            <div className="mt-auto flex gap-6">
              <input
                placeholder="Reply with Olivia AI..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 rounded-full border border-[#2C3450] bg-[#151A28] px-8 py-5 focus:ring-2 focus:ring-[#8B9CFF] focus:outline-none"
              />
              <button className="rounded-full bg-[#8B9CFF] px-8 text-[#0F1117] transition hover:opacity-90">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showCommand && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.25, ease: easePremium }}
              className="w-[600px] rounded-3xl border border-[#2C3450] bg-[#151A28] p-6 shadow-2xl"
            >
              <input
                autoFocus
                placeholder="Search actions, deals, meetings..."
                className="w-full rounded-2xl border border-[#2C3450] bg-[#1F2435] px-6 py-4 focus:outline-none"
              />

              <div className="mt-6 text-sm text-[#8B9CFF]">Revenue Actions</div>

              <div className="mt-3 space-y-2 text-sm">
                <div className="cursor-pointer rounded-xl p-3 hover:bg-[#1F2435]">
                  Convert to Deal
                </div>
                <div className="cursor-pointer rounded-xl p-3 hover:bg-[#1F2435]">
                  Assign Owner
                </div>
                <div className="cursor-pointer rounded-xl p-3 hover:bg-[#1F2435]">
                  Generate AI Summary
                </div>
                <div className="cursor-pointer rounded-xl p-3 hover:bg-[#1F2435]">
                  Schedule CFO Call
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-6 left-8 text-[10px] tracking-wide text-[#4E566F] uppercase">
        o7 Digital - Internal Pilot Build
      </div>
    </div>
  );
}
