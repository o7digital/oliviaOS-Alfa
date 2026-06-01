"use client";

import React from "react";
import Link from "next/link";
import { Activity, Brain, Shield } from "lucide-react";
import EnterOliviaButton from "@/components/EnterOliviaButton";

export default function OliviaControlCenter() {
  const [globalScore, setGlobalScore] = React.useState(87);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setGlobalScore((previous) =>
        Math.min(100, Math.max(60, previous + (Math.random() > 0.5 ? 1 : -1))),
      );
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-black">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-[#FF2F7D] opacity-10 blur-[160px]" />
        <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-[#FF2F7D] opacity-5 blur-[140px]" />
      </div>

      <section className="relative min-h-[900px] overflow-hidden lg:h-[95vh] lg:min-h-[760px]">
        <div className="absolute inset-0">
          <HeroSlider />
        </div>
        <div className="absolute inset-0 bg-black/38" />

        <div className="relative z-10 flex min-h-[900px] items-center px-6 py-16 lg:h-full lg:min-h-0 lg:px-20 lg:py-0">
          <LiveCognitiveDemo />
        </div>
      </section>

      <section className="relative px-6 py-20 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-[0_40px_120px_rgba(0,0,0,0.08)] lg:rounded-[40px] lg:p-14">
            <div className="mb-6 text-sm tracking-wide text-gray-400 uppercase">
              Live Cognitive Engine
              <span className="ml-2 animate-pulse text-[#FF2F7D]">
                ● LIVE
              </span>
            </div>
            <div className="mb-10 text-3xl font-semibold lg:text-4xl">
              {globalScore}% Relationship Score
            </div>
            <div className="space-y-4 text-base">
              <Metric label="Momentum Increasing" value="+12%" accent />
              <Metric label="Human Engagement" value="Strong" />
              <Metric label="Risk Level" value="Moderate" muted />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F9F9FB] px-6 py-24 lg:px-16 lg:py-32">
        <div className="mx-auto mb-16 max-w-7xl text-center lg:mb-20">
          <h2 className="text-4xl font-semibold lg:text-5xl">
            Modular Intelligence Architecture
          </h2>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3 lg:gap-16">
          <Card
            icon={<Activity size={32} />}
            title="Olivia Hostess"
            description="Captures and qualifies incoming interactions in real time."
          />
          <Card
            icon={<Brain size={32} />}
            title="Olivia One"
            description="Builds relational memory and extracts strategic signals."
            link="/inbox"
          />
          <Card
            icon={<Shield size={32} />}
            title="o7 CRM Pulse"
            description="Transforms signals into structured revenue execution."
          />
        </div>
      </section>

      <section className="bg-black px-6 py-28 text-center text-white lg:px-16 lg:py-36">
        <h2 className="mb-10 text-4xl font-semibold lg:text-5xl">
          The Relationship Operating System
        </h2>
        <p className="mx-auto mb-16 max-w-3xl text-lg text-gray-400 lg:text-xl">
          Not just AI. Not just CRM. A strategic relational infrastructure layer.
        </p>
        <EnterOliviaButton />
      </section>
    </div>
  );
}

function LiveCognitiveDemo() {
  const [mode, setMode] = React.useState("business");
  const [probability, setProbability] = React.useState(70);
  const [momentum, setMomentum] = React.useState(3);
  const [timeline, setTimeline] = React.useState<string[]>([]);

  React.useEffect(() => {
    const steps = [
      "Legal review detected",
      "Executive tone identified",
      "Agreement stage confirmed",
      "Closing probability recalculated",
    ];
    let i = 0;

    const interval = setInterval(() => {
      setProbability((prev) => Math.min(prev + 4, 87));
      setMomentum((prev) => Math.min(prev + 2, 12));

      if (i < steps.length) {
        const nextStep = steps[i];
        setTimeline((prev) => [...prev, nextStep]);
        i += 1;
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-6xl rounded-[36px] border border-white/25 bg-black/18 p-7 text-white shadow-[0_45px_130px_rgba(0,0,0,0.42)] backdrop-blur-[2px] lg:w-[85%] lg:rounded-[50px] lg:p-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-0">
          <div className="lg:pr-14">
            <div className="mb-4 text-xs tracking-widest text-white/65 uppercase">
              Incoming Email
            </div>
            <div className="mb-4 text-2xl font-semibold text-white">
              Enterprise Contract Proposal
            </div>
            <p className="leading-relaxed text-white/85">
              We are ready to move forward pending final legal validation. Please
              send the updated enterprise agreement by EOD.
            </p>
          </div>

          <div className="border-t border-white/20 pt-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-14">
            <div className="mb-6 text-sm tracking-widest text-white/65 uppercase">
              Live Cognitive Engine
            </div>
            <div className="mb-4 text-3xl font-semibold">
              Closing Probability: {probability}%
            </div>
            <div className="mb-6 h-2 rounded-full bg-white/20">
              <div
                className="h-2 rounded-full bg-[#FF2F7D] transition-all duration-700"
                style={{ width: `${probability}%` }}
              />
            </div>
            <div className="mb-6">Momentum: +{momentum}%</div>
            <div className="mb-8 min-h-24 space-y-2 text-sm">
              {timeline.map((item, index) => (
                <div key={`${item}-${index}`} className="text-[#FF2F7D]">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              {["business", "human", "limited", "private"].map((candidate) => (
                <button
                  key={candidate}
                  onClick={() => setMode(candidate)}
                  className={`rounded-full border px-5 py-2 text-sm transition-all ${
                    mode === candidate
                      ? "border-[#FF2F7D] bg-[#FF2F7D] text-white"
                      : "border-white/35 bg-black/10 text-white/70 hover:border-white/60 hover:text-white"
                  }`}
                >
                  {candidate}
                </button>
              ))}
            </div>
            <div className="mt-4 text-sm text-white/50">
              Active Mode: <span className="text-white">{mode}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSlider() {
  const slides = ["/hero/hero1.webp", "/hero/hero2.webp", "/hero/hero3.webp"];
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((previous) => (previous + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-950">
      {slides.map((src, slideIndex) => (
        // Local premium photos will be added in public/hero before publication.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt="Olivia Hero"
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-[2000ms] ease-in-out ${
            slideIndex === index ? "scale-105 opacity-100" : "scale-100 opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />
    </div>
  );
}

function Metric({
  label,
  value,
  accent = false,
  muted = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4">
      <span className={accent ? "text-[#FF2F7D]" : ""}>{label}</span>
      <span className={`font-medium ${muted ? "text-gray-500" : ""}`}>{value}</span>
    </div>
  );
}

function Card({
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
  const content = (
    <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all hover:shadow-[0_30px_90px_rgba(0,0,0,0.1)] lg:rounded-[40px] lg:p-12">
      <div className="mb-8 text-[#FF2F7D]">{icon}</div>
      <h3 className="mb-6 text-2xl font-semibold">{title}</h3>
      <p className="leading-relaxed text-gray-500">{description}</p>
    </div>
  );

  if (!link) return content;

  return (
    <Link href={link} className="block">
      {content}
    </Link>
  );
}
