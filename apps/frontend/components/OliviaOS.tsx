"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  TrendingUp,
  Activity,
  Users,
  AlertTriangle,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

type Context = "business" | "human" | "limited" | "private";

const modes: {
  id: Context;
  label: string;
  dotClass: string;
  activeClass: string;
  reminder: string;
}[] = [
  {
    id: "business",
    label: "Business",
    dotClass: "bg-emerald-500",
    activeClass: "border-emerald-200 bg-emerald-50 text-emerald-700",
    reminder: "Olivia Active (business)",
  },
  {
    id: "human",
    label: "Human",
    dotClass: "bg-purple-500",
    activeClass: "border-purple-200 bg-purple-50 text-purple-700",
    reminder: "Olivia Human Layer Active",
  },
  {
    id: "limited",
    label: "Limited",
    dotClass: "bg-amber-400",
    activeClass: "border-amber-200 bg-amber-50 text-amber-700",
    reminder: "Analyse limitée",
  },
  {
    id: "private",
    label: "Private",
    dotClass: "bg-rose-500",
    activeClass: "border-rose-200 bg-rose-50 text-rose-700",
    reminder: "Confidentialité maximale",
  },
];

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
  const [activeMode, setActiveMode] = useState<Context>("business");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    if (activeMode === "business") {
      return "bg-gradient-to-br from-[#f6f8fc] via-[#eef2f9] to-[#e8edf6]";
    }
    if (activeMode === "human") {
      return "bg-gradient-to-br from-[#faf5ff] via-[#f3e8ff] to-[#ede9fe]";
    }
    if (activeMode === "limited") {
      return "bg-gradient-to-br from-[#fefcf5] via-[#fef8e7] to-[#f9edc8]";
    }
    return "bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]";
  }, [activeMode]);

  const highlightBody = (text: string) => {
    if (activeMode === "business") {
      return text
        .replace("move forward", "🟢 move forward")
        .replace("pending final pricing validation", "⚠️ pending final pricing validation");
    }
    if (activeMode === "human") {
      return `💬 Tone detected: Direct / Low emotion\n\n${text}`;
    }
    if (activeMode === "limited") {
      return `⚠️ Limited analysis enabled\n\n${text}`;
    }
    return `🔒 Private mode enabled\n\n${text}`;
  };

  const currentMode = modes.find((mode) => mode.id === activeMode) ?? modes[0];

  return (
    <div
      ref={containerRef}
      onMouseMove={(event) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        x.set(event.clientX - rect.width / 2);
        y.set(event.clientY - rect.height / 2);
      }}
      className={`min-h-screen overflow-x-hidden ${themeClass} text-[#0f172a] lg:h-screen lg:overflow-hidden`}
    >
      <div className="relative z-20 flex items-center justify-between border-b border-white/40 bg-white/50 px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-3xl lg:px-10 lg:py-6">
        <div>
          <div className="text-xl font-semibold tracking-tight lg:text-2xl">
            o7 Olivia One
          </div>
          <div className="text-[10px] tracking-widest text-slate-500 uppercase lg:text-xs">
            Relationship Operating System
          </div>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-2 rounded-full border border-white/70 bg-white/55 p-1.5 text-xs shadow-sm backdrop-blur-xl">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                aria-pressed={activeMode === mode.id}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 transition-all ${
                  activeMode === mode.id
                    ? `${mode.activeClass} shadow-sm`
                    : "border-transparent bg-white/55 text-slate-600 hover:bg-white"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${mode.dotClass}`} />
                {mode.label}
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

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          className="rounded-full border border-white/70 bg-white/70 p-2.5 text-slate-700 shadow-sm backdrop-blur lg:hidden"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="relative z-10 border-b border-white/50 bg-white/75 px-5 py-4 shadow-lg backdrop-blur-2xl lg:hidden">
          <div className="grid grid-cols-2 gap-2">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  setActiveMode(mode.id);
                  setMobileMenuOpen(false);
                }}
                aria-pressed={activeMode === mode.id}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-medium transition-all ${
                  activeMode === mode.id
                    ? mode.activeClass
                    : "border-white/80 bg-white/65 text-slate-600"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${mode.dotClass}`} />
                {mode.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setFocusMode(!focusMode);
              setMobileMenuOpen(false);
            }}
            className="mt-3 w-full rounded-xl border border-white/80 bg-white/70 px-4 py-2.5 text-xs font-medium text-slate-700 shadow-sm"
          >
            {focusMode ? "Exit Focus" : "Ultra Focus"}
          </button>
        </div>
      )}

      <div className="flex flex-col lg:h-[calc(100vh-88px)] lg:flex-row">
        {!focusMode && (
          <motion.div
            style={{ rotateX, rotateY }}
            className="w-full space-y-4 border-b border-white/40 bg-white/60 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.08)] backdrop-blur-2xl lg:w-80 lg:border-r lg:border-b-0 lg:p-6"
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
          className="min-h-[340px] flex-1 whitespace-pre-line border-b border-white/40 bg-white/60 px-5 py-8 shadow-[0_40px_100px_rgba(0,0,0,0.08)] backdrop-blur-2xl lg:border-r lg:border-b-0 lg:px-16 lg:py-14"
        >
          <div className="mb-5 text-3xl font-semibold tracking-tight lg:mb-6 lg:text-4xl">
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
          className="w-full overflow-y-auto bg-white/60 px-5 py-8 shadow-[0_50px_120px_rgba(0,0,0,0.1)] backdrop-blur-3xl lg:w-[460px] lg:px-12 lg:py-14"
        >
          <div className="space-y-12">
            <div>
              <div className="mb-3 text-xs font-medium tracking-widest text-slate-400 uppercase">
                Active mode
              </div>
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${currentMode.activeClass}`}
              >
                <span className={`h-2.5 w-2.5 rounded-full ${currentMode.dotClass}`} />
                {currentMode.reminder}
              </div>
            </div>

            {activeMode === "private" ? (
              <div className="rounded-2xl border border-rose-100 bg-white/55 p-5 text-sm leading-relaxed text-slate-600">
                Detailed intelligence is hidden while maximum privacy is active.
              </div>
            ) : (
              <>
            {activeMode !== "human" && (
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

            {activeMode === "human" && (
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

            {activeMode !== "limited" && (
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
            )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
