"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  BrainCircuit,
  GitBranch,
  Activity,
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
  riskLevel: "low" | "high";
  scoreEvolution: number[];
  enterpriseHistory: string[];
  userProfile: {
    role: string;
    authorityLevel: string;
    tone: string;
    relationshipScore: number;
  };
  memory: string[];
  timeline: TimelineEvent[];
  pipelineSuggestion: {
    stage: string;
    confidence: number;
  };
};

export default function OliviaOne() {
  const [selectedMail, setSelectedMail] = useState(0);

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
      riskLevel: "low",
      scoreEvolution: [45, 60, 72, 78, 82],
      enterpriseHistory: [
        "CFO engaged in Q1",
        "Legal involved last week",
        "Multiple departments reviewing",
      ],
      userProfile: {
        role: "Enterprise Buyer",
        authorityLevel: "Decision Maker",
        tone: "Direct / Transactional",
        relationshipScore: 78,
      },
      memory: [
        "Met at Tech Summit 2024",
        "Requested enterprise pricing in February",
        "Asked for legal validation last week",
      ],
      timeline: [
        { label: "First contact", detail: "Met at Tech Summit", impact: "neutral" },
        { label: "Pricing requested", detail: "Enterprise tier discussion", impact: "positive" },
        { label: "Legal review", detail: "Validation pending", impact: "risk" },
        { label: "Closing signal", detail: "Agreement requested", impact: "strong" },
      ],
      pipelineSuggestion: {
        stage: "Closing",
        confidence: 0.82,
      },
    },
  ];

  const current = mails[selectedMail];

  const impactColor = (impact: TimelineEvent["impact"]) => {
    switch (impact) {
      case "strong":
        return "bg-green-500";
      case "positive":
        return "bg-indigo-500";
      case "risk":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const momentumIndicator = () => {
    if (current.momentum === "up") {
      return (
        <div className="flex items-center gap-2 text-sm font-medium text-green-600">
          <ArrowUpRight size={14} /> Momentum Increasing
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 text-sm font-medium text-red-600">
        <ArrowDownRight size={14} /> Momentum Decreasing
      </div>
    );
  };

  const riskIndicator = () => {
    if (current.riskLevel === "low") return null;
    return (
      <div className="flex items-center gap-2 text-sm font-medium text-red-600">
        <AlertTriangle size={14} /> Risk Detected
      </div>
    );
  };

  return (
    <div className="flex h-screen flex-col bg-[#F4F6F9] text-[#111827]">
      <div className="border-b bg-white px-8 py-4">
        <div className="text-xl font-semibold">o7 Olivia One</div>
        <div className="text-xs tracking-wider text-gray-500 uppercase">
          Mail + Relationship Intelligence Engine
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-80 overflow-y-auto border-r bg-white">
          {mails.map((mail, i) => (
            <motion.div
              key={i}
              whileHover={{ backgroundColor: "#F3F4F6" }}
              onClick={() => setSelectedMail(i)}
              className={`cursor-pointer border-b p-4 ${
                selectedMail === i ? "bg-[#E5E7EB]" : ""
              }`}
            >
              <div className="flex justify-between text-sm">
                <div className="font-medium">{mail.from}</div>
                <div className="text-gray-400">{mail.date}</div>
              </div>
              <div className="text-sm">{mail.subject}</div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-1 flex-col bg-white">
          <div className="border-b px-8 py-6">
            <div className="text-lg font-semibold">{current.subject}</div>
            <div className="text-sm text-gray-500">
              From: {current.from} • {current.company}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-8 py-6 text-sm leading-relaxed">
            {current.body}
          </div>
        </div>

        <div className="w-96 space-y-10 overflow-y-auto border-l bg-white p-6">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
              <TrendingUp size={14} /> Revenue Engine
            </div>
            <div className="text-sm text-gray-600">
              Probability:{" "}
              <span className="font-semibold text-indigo-600">
                {current.revenueScore}%
              </span>
            </div>
            <div className="mt-1 text-sm text-gray-600">
              Estimated Value:{" "}
              <span className="font-semibold">
                ${current.revenueValue.toLocaleString()}
              </span>
            </div>
            <div className="mt-3">{momentumIndicator()}</div>
            <div className="mt-2">{riskIndicator()}</div>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
              <Activity size={14} /> Relationship Score Evolution
            </div>
            <div className="flex h-20 items-end gap-2">
              {current.scoreEvolution.map((score, i) => (
                <div
                  key={i}
                  className="w-4 rounded bg-indigo-500"
                  style={{ height: `${score / 1.5}%` }}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-medium">
              <Activity size={14} /> Relationship Timeline
            </div>
            <div className="relative space-y-6 border-l pl-6">
              {current.timeline.map((event, idx) => (
                <div key={idx} className="relative">
                  <span
                    className={`absolute -top-0 -left-[10px] h-4 w-4 rounded-full ${impactColor(
                      event.impact,
                    )}`}
                  />
                  <div className="text-sm font-medium">{event.label}</div>
                  <div className="text-xs text-gray-500">{event.detail}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
              <BrainCircuit size={14} /> Enterprise Intelligence
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              {current.enterpriseHistory.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
              <Users size={14} /> User Intelligence
            </div>
            <div className="text-sm text-gray-600">
              Role: <span className="font-semibold">{current.userProfile.role}</span>
            </div>
            <div className="text-sm text-gray-600">
              Authority:{" "}
              <span className="font-semibold">
                {current.userProfile.authorityLevel}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Tone: <span className="font-semibold">{current.userProfile.tone}</span>
            </div>
            <div className="text-sm text-gray-600">
              Relationship Score:{" "}
              <span className="font-semibold">
                {current.userProfile.relationshipScore}/100
              </span>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
              <GitBranch size={14} /> Pipeline Suggestion
            </div>
            <div className="text-sm text-gray-600">
              Suggested Stage:{" "}
              <span className="font-semibold">
                {current.pipelineSuggestion.stage}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Confidence:{" "}
              <span className="font-semibold">
                {Math.round(current.pipelineSuggestion.confidence * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
