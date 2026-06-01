"use client";

import React from "react";

type MailPreview = {
  id: number;
  from: string;
  subject: string;
  type: string;
  score: number;
};

const initialMails: MailPreview[] = [
  {
    id: 1,
    from: "Enterprise Client",
    subject: "Contract discussion follow-up",
    type: "Business",
    score: 74,
  },
  {
    id: 2,
    from: "Long-term Partner",
    subject: "Concern about collaboration rhythm",
    type: "Human",
    score: 58,
  },
];

const eventsSeed = [
  "New high-intent email detected",
  "Relationship momentum increasing",
  "Human friction signal detected",
  "Opportunity probability updated",
  "New inbound interaction (Hostess)",
];

export default function OliviaControlCenter() {
  const [mails, setMails] = React.useState<MailPreview[]>(initialMails);
  const [liveFeed, setLiveFeed] = React.useState<string[]>([]);
  const [globalScore, setGlobalScore] = React.useState(87);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const newMail: MailPreview = {
        id: Date.now(),
        from: "New Contact",
        subject: "Dynamic incoming interaction",
        type: Math.random() > 0.5 ? "Business" : "Human",
        score: Math.floor(Math.random() * 40) + 50,
      };

      setMails((prev) => [newMail, ...prev.slice(0, 5)]);

      const newEvent =
        eventsSeed[Math.floor(Math.random() * eventsSeed.length)];

      setLiveFeed((prev) => [newEvent, ...prev.slice(0, 5)]);

      setGlobalScore((prev) =>
        Math.min(100, Math.max(55, prev + (Math.random() > 0.5 ? 1 : -1))),
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

      <section className="relative px-6 py-20 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3 lg:gap-12">
          <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-xl lg:rounded-[40px] lg:p-12">
            <div className="mb-4 text-sm text-gray-400 uppercase">
              Global Relationship Index
            </div>
            <div className="text-5xl font-semibold text-[#FF2F7D] transition-all duration-500">
              {globalScore}%
            </div>
            <div className="mt-6 space-y-2 text-sm">
              <div>Business Momentum: +12%</div>
              <div>Human Trust Level: Strong</div>
              <div>Risk Exposure: Moderate</div>
            </div>
          </div>

          <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-xl lg:rounded-[40px] lg:p-12">
            <div className="mb-6 text-sm text-gray-400 uppercase">
              Live Intelligence Feed
            </div>
            <div className="space-y-3 text-sm">
              {liveFeed.map((event, index) => (
                <div
                  key={`${event}-${index}`}
                  className="animate-pulse border-l-4 border-[#FF2F7D] py-2 pl-4"
                >
                  {event}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-xl lg:rounded-[40px] lg:p-12">
            <div className="mb-6 text-sm text-gray-400 uppercase">
              Olivia One Inbox (Live)
            </div>
            <div className="space-y-4 text-sm">
              {mails.map((mail) => (
                <div
                  key={mail.id}
                  className="border-b border-gray-100 pb-3 transition-all duration-300"
                >
                  <div className="flex justify-between gap-4">
                    <span className="font-medium">{mail.from}</span>
                    <span className="text-[#FF2F7D]">{mail.score}%</span>
                  </div>
                  <div className="text-gray-500">{mail.subject}</div>
                  <div className="mt-1 text-xs text-gray-400">{mail.type}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
