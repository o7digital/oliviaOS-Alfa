"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  TrendingUp,
  Activity,
  BrainCircuit,
  Users,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

type TimelineEvent = {
  label: string;
  detail: string;
  impact: "neutral" | "positive" | "risk" | "strong";
};

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
  timeline: TimelineEvent[];
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

  const impactColor = (impact: TimelineEvent["impact"]) => {
    switch (impact) {
      case "strong":
        return "bg-emerald-500";
      case "positive":
        return "bg-indigo-500";
      case "risk":
        return "bg-rose-500";
      default:
        return "bg-slate-400";
    }
  };

  const momentumIndicator = () => {
    if (current.momentum === "up") {
      return (
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
          <ArrowUpRight size={14} /> Momentum Increasing
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 text-xs font-medium text-rose-600">
        <ArrowDownRight size={14} /> Momentum Decreasing
      </div>
    );
  };

  const riskIndicator = () => {
    if (current.riskLevel === "low") return null;

    return (
      <div className="flex items-center gap-2 text-xs font-medium text-rose-600">
        <AlertTriangle size={14} /> Risk detected
      </div>
    );
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
      className="h-screen overflow-hidden bg-gradient-to-br from-[#f6f8fc] via-[#eef2f9] to-[#e8edf6] text-[#0f172a]"
    >
      <div className="flex items-center justify-between border-b border-white/40 bg-white/50 px-10 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-3xl">
        <div>
          <div className="text-2xl font-semibold tracking-tight">o7 Olivia One</div>
          <div className="text-xs tracking-widest text-slate-500 uppercase">
            Relationship Operating System
          </div>
        </div>

        <button
          onClick={() => setFocusMode(!focusMode)}
          className="rounded-full bg-white/70 px-6 py-2 text-xs shadow-md backdrop-blur transition-all duration-500 hover:shadow-xl"
        >
          {focusMode ? "Exit Focus" : "Ultra Focus"}
        </button>
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
          className="flex-1 border-r border-white/40 bg-white/60 px-16 py-14 shadow-[0_40px_100px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
        >
          <div className="mb-6 text-4xl font-semibold tracking-tight">
            {current.subject}
          </div>
          <div className="mb-10 text-sm text-slate-500">
            {current.from} • {current.company}
          </div>
          <div className="max-w-3xl text-lg leading-relaxed text-slate-700">
            {current.body}
          </div>
        </motion.div>

        <motion.div
          style={{ rotateX, rotateY }}
          className="w-[460px] overflow-y-auto bg-white/60 px-12 py-14 shadow-[0_50px_120px_rgba(0,0,0,0.1)] backdrop-blur-3xl"
        >
          <div className="space-y-14">
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
              <div className="mt-2 text-sm text-slate-600">
                Value{" "}
                <span className="font-semibold">
                  ${current.revenueValue.toLocaleString()}
                </span>
              </div>
              <div className="mt-4">{momentumIndicator()}</div>
              <div className="mt-2">{riskIndicator()}</div>
            </div>

            <div>
              <div className="mb-6 flex items-center gap-3 text-sm font-medium">
                <Activity size={16} /> Relationship Score Evolution
              </div>
              <div className="flex h-32 items-end gap-4">
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

            <div>
              <div className="mb-6 text-sm font-medium">Relationship Timeline</div>
              <div className="relative space-y-6 border-l border-slate-300 pl-6">
                {current.timeline.map((event, index) => (
                  <div key={index} className="relative">
                    <span
                      className={`absolute top-1 -left-[33px] h-4 w-4 rounded-full ${impactColor(
                        event.impact,
                      )}`}
                    />
                    <div className="text-sm font-medium">{event.label}</div>
                    <div className="text-xs text-slate-500">{event.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-3 text-sm font-medium">
                <BrainCircuit size={16} /> Enterprise Intelligence
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                {current.enterprise.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-3 text-sm font-medium">
                <Users size={16} /> User Intelligence
              </div>
              <div className="text-sm text-slate-600">
                Role: <span className="font-semibold">{current.userProfile.role}</span>
              </div>
              <div className="text-sm text-slate-600">
                Authority:{" "}
                <span className="font-semibold">{current.userProfile.authority}</span>
              </div>
              <div className="text-sm text-slate-600">
                Tone: <span className="font-semibold">{current.userProfile.tone}</span>
              </div>
              <div className="text-sm text-slate-600">
                Relationship Score:{" "}
                <span className="font-semibold">
                  {current.userProfile.relationshipScore}/100
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
