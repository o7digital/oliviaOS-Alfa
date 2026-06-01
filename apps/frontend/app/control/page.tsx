"use client";

import { useEffect, useState } from "react";

export default function ControlBoard() {
  const [revenue, setRevenue] = useState(4200000);
  const [engagement, setEngagement] = useState(32);

  useEffect(() => {
    const interval = setInterval(() => {
      setRevenue((prev) => prev + Math.floor(Math.random() * 20000));
      setEngagement((prev) => Math.min(45, prev + (Math.random() > 0.5 ? 1 : 0)));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="px-20 py-32">
        <h1 className="mb-12 text-6xl font-semibold">
          Retail Brand - 90-Day Strategic Impact
        </h1>

        <div className="grid grid-cols-2 gap-16 text-3xl">
          <div>
            Revenue influenced
            <br />
            <span className="font-bold text-[#FF2F7D]">
              ${revenue.toLocaleString()}
            </span>
          </div>

          <div>
            Executive engagement
            <br />
            <span className="font-bold text-[#FF2F7D]">+{engagement}%</span>
          </div>

          <div>
            Strategic accounts activated
            <br />
            <span className="font-bold text-[#FF2F7D]">146</span>
          </div>

          <div>
            Risk reduction
            <br />
            <span className="font-bold text-[#FF2F7D]">-18%</span>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-20 py-32">
        <h2 className="mb-10 text-4xl">
          Olivia Hostess - Interaction Qualification Layer
        </h2>

        <ul className="space-y-6 text-2xl text-gray-300">
          <li>Website visits: 124,892</li>
          <li>Qualified conversations: 8,421</li>
          <li>High-intent leads: 1,203</li>
          <li>Conversion lift: +14.3%</li>
        </ul>
      </section>

      <section className="border-t border-white/10 px-20 py-32">
        <h2 className="mb-10 text-4xl">Olivia One - Relational Intelligence Engine</h2>

        <ul className="space-y-6 text-2xl text-gray-300">
          <li>Emails analyzed: 42,118</li>
          <li>Human tension signals: 3,982</li>
          <li>Buying signals detected: 621</li>
          <li>Escalations prevented: 74</li>
        </ul>
      </section>

      <section className="border-t border-white/10 px-20 py-32">
        <h2 className="mb-10 text-4xl">o7 CRM Pulse - Revenue Activation</h2>

        <ul className="space-y-6 text-2xl text-gray-300">
          <li>Opportunities generated: 389</li>
          <li>Deals in negotiation: 112</li>
          <li>Average closing probability: 63%</li>
          <li>Revenue pipeline: $8.7M</li>
        </ul>
      </section>

      <section className="border-t border-white/10 px-20 py-32">
        <h2 className="mb-10 text-4xl">Strategic Insights</h2>

        <ul className="space-y-6 text-2xl text-gray-300">
          <li>Outdoor segment accelerating</li>
          <li>Fitness category softening in EU</li>
          <li>Executive-level conversations up 21%</li>
          <li>Product risk exposure Q4 detected</li>
        </ul>
      </section>
    </div>
  );
}
