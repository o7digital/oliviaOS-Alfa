"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const RelationshipMomentumChart = dynamic(
  () => import("@/components/RelationshipMomentumChart"),
  { ssr: false },
);

type CounterProps = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
};

export default function ControlBoard() {
  const [revenue, setRevenue] = useState(4200000);
  const [engagement, setEngagement] = useState(32);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRevenue((previous) => previous + Math.floor(Math.random() * 15000));
      setEngagement((previous) =>
        Math.min(50, previous + (Math.random() > 0.6 ? 1 : 0)),
      );
    }, 4000);

    const handleKey = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "Enter") {
        setFullscreen((previous) => !previous);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div
      className={`min-h-screen bg-black text-white transition-all duration-700 ${
        fullscreen ? "fixed inset-0 z-50 overflow-auto" : ""
      }`}
    >
      <section className="px-6 py-20 lg:px-20 lg:py-28">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-4xl leading-tight font-semibold md:text-5xl lg:text-6xl"
        >
          Retail Strategic Intelligence Report
        </motion.h1>

        <div className="grid gap-12 text-3xl md:grid-cols-2 lg:gap-20">
          <Counter label="Revenue Influenced" value={revenue} prefix="$" />
          <Counter label="Executive Engagement" value={engagement} suffix="%" />
          <Counter label="Strategic Accounts Activated" value={146} />
          <Counter label="Risk Reduction" value={18} suffix="%" />
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20 lg:px-20 lg:py-28">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-3xl lg:text-4xl"
        >
          Relationship Momentum (6 Months)
        </motion.h2>

        <div className="h-[300px] rounded-3xl bg-white/5 p-4 backdrop-blur-lg md:p-6">
          <RelationshipMomentumChart />
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20 lg:px-20 lg:py-28">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-10 text-3xl lg:text-4xl"
        >
          AI Strategic Insights
        </motion.h2>

        <ul className="space-y-6 text-xl text-gray-300 lg:text-2xl">
          <li>Outdoor segment accelerating</li>
          <li>Executive-level conversations up 21%</li>
          <li>High-value buying signals detected</li>
          <li>Risk cluster identified in EU Q4</li>
        </ul>
      </section>
    </div>
  );
}

function Counter({ label, value, prefix = "", suffix = "" }: CounterProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = value / (duration / 16);

    const interval = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(interval);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-3 text-sm tracking-wider text-gray-400 uppercase">
        {label}
      </div>
      <div className="text-4xl font-bold text-[#FF2F7D] md:text-5xl">
        {prefix}
        {display.toLocaleString()}
        {suffix}
      </div>
    </motion.div>
  );
}
