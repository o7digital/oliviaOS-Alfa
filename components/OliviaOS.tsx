"use client";

import { useEffect, useState } from "react";
import { Circle, Send } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

const emails = [
  {
    from: "Jean Dupont",
    subject: "Proposition devis urgente",
    deal: "€10k potentiel",
    context: "Client très chaud. Envoyer devis aujourd'hui + proposer call.",
    content:
      "Je confirme mon intérêt. Merci de m'envoyer le devis détaillé aujourd'hui.",
  },
  {
    from: "Maria Lopez",
    subject: "Meeting confirmation",
    deal: "Deal en discussion",
    context: "Confirmer horaire et envoyer lien visio.",
    content: "Confirmamos la reunión mañana a las 14h.",
  },
];

export default function OliviaOS() {
  const [focusMode, setFocusMode] = useState(false);
  const [ultraFocus, setUltraFocus] = useState(false);
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState(0);
  const [newMailFlash, setNewMailFlash] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [0, 1000], [6, -6]);
  const rotateY = useTransform(mouseX, [0, 1600], [-6, 6]);

  useEffect(() => {
    const timer = setTimeout(() => setNewMailFlash(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "j") {
        setSelected((value) => Math.min(value + 1, emails.length - 1));
      }
      if (event.key === "k") {
        setSelected((value) => Math.max(value - 1, 0));
      }
      if (event.metaKey && event.key.toLowerCase() === "k") {
        alert("Command Palette");
      }
      if (event.key === "e") alert("Archive email");
      if (event.key === "r") setMessage("Réponse générée par Olivia...");
      if (event.key === "f") setUltraFocus((value) => !value);
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const email = emails[selected];

  return (
    <main
      onMouseMove={(event) => {
        mouseX.set(event.clientX);
        mouseY.set(event.clientY);
      }}
      className="flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-indigo-950 via-black to-indigo-900 text-white"
    >
      <header className="flex items-center justify-between border-b border-indigo-900 bg-black/40 px-10 py-5 backdrop-blur-2xl">
        <div className="flex items-center gap-4">
          <span className="text-xl font-semibold tracking-tight">Olivia OS</span>
          <span className="flex items-center gap-2 text-xs text-indigo-300">
            <Circle
              size={10}
              className="animate-pulse fill-green-500 text-green-500"
            />
            Live
          </span>
        </div>
        <div className="flex gap-6 text-sm text-indigo-400">
          <button onClick={() => setFocusMode(!focusMode)}>
            {focusMode ? "Quit Focus" : "Focus"}
          </button>
          <button onClick={() => setUltraFocus(!ultraFocus)}>
            Ultra Focus
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <AnimatePresence>
          {!focusMode && !ultraFocus && (
            <motion.aside
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-80 border-r border-indigo-900 bg-indigo-950/30 p-8 backdrop-blur-xl"
            >
              <h2 className="mb-6 text-xs uppercase tracking-widest text-indigo-400">
                Inbox
              </h2>
              {emails.map((mail, index) => (
                <motion.button
                  key={mail.from}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSelected(index)}
                  className={`relative mb-4 block w-full cursor-pointer rounded-3xl p-5 text-left backdrop-blur-xl transition ${
                    selected === index
                      ? "border border-indigo-500 bg-indigo-800/40"
                      : "bg-indigo-950/40"
                  }`}
                >
                  <span className="block text-sm font-medium">{mail.from}</span>
                  <span className="block text-xs text-indigo-300">
                    {mail.subject}
                  </span>
                  <span className="mt-1 block text-xs text-indigo-400">
                    {mail.deal}
                  </span>
                  {newMailFlash && index === 0 && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 rounded-3xl border border-indigo-400"
                    />
                  )}
                </motion.button>
              ))}
            </motion.aside>
          )}
        </AnimatePresence>

        <section className="flex flex-1 flex-col p-16">
          <motion.div
            style={{ rotateX, rotateY }}
            transition={{ type: "spring", stiffness: 80 }}
            className="mx-auto flex w-full max-w-3xl flex-1 flex-col"
          >
            <div className="mb-10">
              <h1 className="text-2xl font-semibold tracking-tight">Thread</h1>
              <p className="mt-4 leading-relaxed text-indigo-200">
                {email.content}
              </p>
            </div>
            <div className="mt-auto flex gap-4">
              <input
                placeholder="Répondre avec Olivia..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="flex-1 rounded-3xl border border-indigo-700 bg-indigo-950/50 px-5 text-white backdrop-blur-xl outline-none"
              />
              <button
                aria-label="Envoyer"
                className="rounded-3xl bg-indigo-500 p-4 transition hover:bg-indigo-400"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        </section>

        <AnimatePresence>
          {!focusMode && !ultraFocus && (
            <motion.aside
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 200, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-96 border-l border-indigo-900 bg-indigo-950/30 p-8 backdrop-blur-xl"
            >
              <h2 className="mb-6 text-xs uppercase tracking-widest text-indigo-400">
                Deal Intelligence
              </h2>
              <div className="rounded-3xl border border-indigo-700 bg-indigo-900/40 p-6 backdrop-blur-xl">
                <div className="mb-2 text-sm font-medium">Pipeline Auto</div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-indigo-950">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "72%" }}
                    transition={{ duration: 1 }}
                    className="h-full bg-indigo-400"
                  />
                </div>
                <div className="mt-3 text-xs text-indigo-400">
                  Probabilité : 72%
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        animate={{ scale: message ? 1.05 : 1 }}
        className="fixed right-10 bottom-10 rounded-3xl border border-indigo-500/30 bg-white/10 px-8 py-5 shadow-2xl backdrop-blur-2xl"
      >
        <div className="text-sm font-medium text-indigo-200">
          Olivia Copilot
        </div>
        <div className="mt-2 text-xs text-indigo-300">{email.context}</div>
      </motion.div>
    </main>
  );
}
