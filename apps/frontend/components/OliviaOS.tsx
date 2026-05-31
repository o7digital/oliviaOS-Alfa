"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  TrendingUp,
  Activity,
  Users,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";

type Context = "business" | "human" | "mixed";

type MailItem = {
  from: string;
  company: string;
  subject: string;
  body: string;
  date: string;
  revenueScore: number;
  revenueValue: number;
  momentum: "up" | "down";
  riskLevel: "low" | "medium" | "high";
  scoreEvolution: number[];
  timeline: {
    label: string;
    detail: string;
    impact: "neutral" | "positive" | "risk" | "strong";
  }[];
  enterprise: string[];
  userProfile: {
    role: string;
    authority: string;
    tone: string;
    relationshipScore: number;
  };
};

export default function OliviaOne() {
  const [selectedMail, setSelectedMail] = useState(0);
  const [focusMode, setFocusMode] = useState(false);
  const [detectedContext] = useState<Context>("business");
  const [manualOverride, setManualOverride] = useState<Context | null>(null);
  const effectiveContext = manualOverride ?? detectedContext;
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-200, 200], [4, -4]);
  const rotateY = useTransform(x, [-200, 200], [-4, 4]);

  const mails: MailItem[] = [
    {
      from: "Andrew Miller",
      company: "Enterprise Corp",
      subject: "Enterprise contract proposal",
      body: "We are ready to move forward pending final pricing validation. Please share the updated enterprise agreement by EOD.",
      date: "09:14",
      revenueScore: 82,
      revenueValue: 120000,
      momentum: "up",
      riskLevel: "medium",
      scoreEvolution: [45, 60, 72, 78, 82],
      timeline: [
        { label: "First contact", detail: "Met at Tech Summit", impact: "neutral" },
        { label: "Pricing requested", detail: "Enterprise tier discussion", impact: "positive" },
        { label: "Legal review", detail: "Validation pending", impact: "risk" },
        { label: "Closing signal", detail: "Agreement requested", impact: "strong" },
      ],
      enterprise: [
        "CFO engaged in Q1",
        "Legal involved last week",
        "Multiple departments reviewing",
      ],
      userProfile: {
        role: "Enterprise Buyer",
        authority: "Decision Maker",
        tone: "Direct / Transactional",
        relationshipScore: 78,
      },
    },
  ];

  const current = mails[selectedMail];

  const themeClass = useMemo(() => {
    if (effectiveContext === "business") {
      return "bg-gradient-to-br from-[#f6f8fc] via-[#eef2f9] to-[#e8edf6]";
    }
    if (effectiveContext === "human") {
      return "bg-gradient-to-br from-[#faf5ff] via-[#f3e8ff] to-[#ede9fe]";
    }
    return "bg-gradient-to-br from-[#fef9f3] via-[#fef3c7] to-[#fde68a]";
  }, [effectiveContext]);

  const highlightBody = (text: string) => {
    if (effectiveContext === "business") {
      return text
        .replace("move forward", "🟢 move forward")
        .replace("pending final pricing validation", "⚠️ pending final pricing validation");
    }
    if (effectiveContext === "human") {
      return `💬 Tone detected: Direct / Low emotion\n\n${text}`;
    }
    return `⚖️ Mixed Context Detected\n\n${text}`;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={(event) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        x.set(event.clientX - rect.width / 2);
        y.set(event.clientY - rect.height / 2);
      }}
      className={`h-screen overflow-hidden ${themeClass} text-[#0f172a]`}
    >
      <div className="flex items-center justify-between border-b border-white/40 bg-white/50 px-10 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-3xl">
        <div>
          <div className="text-2xl font-semibold tracking-tight">o7 Olivia One</div>
          <div className="text-xs tracking-widest text-slate-500 uppercase">
            Relationship Operating System
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-2 text-xs">
            {(["business", "human", "mixed"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setManualOverride(manualOverride === mode ? null : mode)}
                className={`rounded-full px-3 py-1 transition-all ${
                  effectiveContext === mode
                    ? "bg-indigo-600 text-white"
                    : "bg-white/70 text-slate-600"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            onClick={() => setFocusMode(!focusMode)}
            className="rounded-full bg-white/70 px-6 py-2 text-xs shadow-md backdrop-blur transition-all duration-500 hover:shadow-xl"
          >
            {focusMode ? "Exit Focus" : "Ultra Focus"}
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-88px)]">
        {!focusMode && (
          <motion.div
            style={{ rotateX, rotateY }}
            className="w-80 space-y-4 border-r border-white/40 bg-white/60 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
          >
            {mails.map((mail, index) => (
              <motion.div
                key={mail.subject}
                whileHover={{ scale: 1.03 }}
                onClick={() => setSelectedMail(index)}
                className={`cursor-pointer rounded-2xl bg-white/60 p-5 shadow-md backdrop-blur-xl transition-all duration-500 hover:shadow-2xl ${
                  selectedMail === index ? "ring-1 ring-indigo-300" : ""
                }`}
              >
                <div className="flex justify-between text-sm">
                  <div className="font-medium tracking-tight">{mail.from}</div>
                  <div className="text-slate-400">{mail.date}</div>
                </div>
                <div className="mt-1 text-sm text-slate-600">{mail.subject}</div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          layout
          style={{ rotateX, rotateY }}
          className="flex-1 whitespace-pre-line border-r border-white/40 bg-white/60 px-16 py-14 shadow-[0_40px_100px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
        >
          <div className="mb-6 text-4xl font-semibold tracking-tight">
            {current.subject}
          </div>
          <div className="mb-10 text-sm text-slate-500">
            {current.from} • {current.company}
          </div>
          <div className="max-w-3xl text-lg leading-relaxed text-slate-700">
            {highlightBody(current.body)}
          </div>
        </motion.div>

        <motion.div
          style={{ rotateX, rotateY }}
          className="w-[460px] overflow-y-auto bg-white/60 px-12 py-14 shadow-[0_50px_120px_rgba(0,0,0,0.1)] backdrop-blur-3xl"
        >
          <div className="space-y-12">
            {effectiveContext !== "human" && (
              <div>
                <div className="mb-4 flex items-center gap-3 text-sm font-medium">
                  <TrendingUp size={16} /> Revenue Engine
                </div>
                <div className="text-sm text-slate-600">
                  Probability{" "}
                  <span className="font-semibold text-indigo-600">
                    {current.revenueScore}%
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-600">
                  <ArrowUpRight size={14} /> Momentum Increasing
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs font-medium text-rose-600">
                  <AlertTriangle size={14} /> Risk detected
                </div>
              </div>
            )}

            {effectiveContext !== "business" && (
              <div>
                <div className="mb-4 flex items-center gap-3 text-sm font-medium">
                  <Users size={16} /> Human Signal
                </div>
                <div className="text-sm text-slate-600">
                  Tone: {current.userProfile.tone}
                </div>
                <div className="text-sm text-slate-600">
                  Relationship: {current.userProfile.relationshipScore}/100
                </div>
              </div>
            )}

            <div>
              <div className="mb-6 flex items-center gap-3 text-sm font-medium">
                <Activity size={16} /> Evolution
              </div>
              <div className="flex h-28 items-end gap-4">
                {current.scoreEvolution.map((score, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${score}%` }}
                    transition={{ duration: 0.8, delay: index * 0.15 }}
                    className="w-6 rounded-2xl bg-gradient-to-t from-indigo-500 to-indigo-300 shadow-xl"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
