"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function OliviaOne() {
  const mail = {
    from: "Andrew Miller",
    company: "Enterprise Corp",
    subject: "Enterprise contract proposal",
    body: "We are ready to move forward pending final pricing validation. Please share the updated enterprise agreement by EOD.",
    probability: 82,
  };

  return (
    <div className="h-screen bg-[#f4f6fb] text-[#0f172a]">
      <div className="flex items-center justify-between px-10 py-6">
        <div>
          <div className="text-2xl font-semibold tracking-tight">o7 Olivia One</div>
          <div className="text-xs tracking-widest text-slate-500 uppercase">
            Relationship Operating System
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 rounded-full border bg-white px-4 py-2 text-xs font-medium shadow-sm">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" /> Business
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-500" /> Human
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-yellow-400" /> Limited
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" /> Private
            </span>
          </div>

          <div className="flex gap-3 text-sm">
            <button className="rounded-full bg-indigo-600 px-4 py-1 text-white">
              business
            </button>
            <button className="rounded-full border bg-white px-4 py-1 text-slate-600">
              human
            </button>
            <button className="rounded-full border bg-white px-4 py-1 text-slate-600">
              mixed
            </button>
            <button className="rounded-full border bg-white px-5 py-1 shadow">
              Ultra Focus
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-88px)]">
        <div className="w-[300px] px-6">
          <div className="mt-6 cursor-pointer rounded-2xl border bg-white p-4 shadow-sm">
            <div className="flex justify-between text-sm font-medium">
              <span>Andrew Miller</span>
              <span className="text-slate-400">09:14</span>
            </div>
            <div className="mt-1 text-sm text-slate-500">
              Enterprise contract proposal
            </div>
          </div>
        </div>

        <div className="flex-1 px-20 pt-16">
          <div className="max-w-3xl">
            <div className="mb-6 text-5xl font-semibold tracking-tight">
              {mail.subject}
            </div>
            <div className="mb-12 text-sm text-slate-500">
              {mail.from} • {mail.company}
            </div>
            <div className="text-xl leading-relaxed">
              We are ready to
              <span className="font-medium text-emerald-600"> ● move forward </span>
              pending final pricing validation. Please share the updated
              enterprise agreement by EOD.
            </div>
          </div>
        </div>

        <div className="w-[420px] space-y-10 border-l bg-white px-12 pt-16">
          <div className="rounded-2xl border p-6 shadow-sm">
            <div className="mb-4 text-sm font-semibold">Olivia Control</div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-green-500" />
                Olivia Active (business)
              </div>
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-purple-500" />
                Olivia Human Layer Active
              </div>
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                Analyse limitée
              </div>
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                Confidentialité maximale
              </div>
            </div>
          </div>

          <div>
            <div className="mb-6 flex items-center gap-2">
              <ArrowUpRight size={16} />
              <span className="font-medium">Revenue Engine</span>
            </div>
            <div className="mb-2 text-sm text-slate-600">
              Probability
              <span className="font-semibold text-indigo-600"> {mail.probability}%</span>
            </div>
            <div className="mb-6 text-sm font-medium text-emerald-600">
              Momentum Increasing
            </div>
            <div className="mb-12 text-sm font-medium text-red-500">
              ⚠ Risk detected
            </div>
            <div className="mb-4 text-sm font-medium">Evolution</div>
            <div className="flex h-20 items-end gap-3">
              {[40, 55, 65, 75, 82].map((height) => (
                <div
                  key={height}
                  className="w-8 rounded-full bg-gradient-to-t from-indigo-500 to-indigo-300"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
