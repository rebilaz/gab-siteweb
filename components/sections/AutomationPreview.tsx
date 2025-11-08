"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type AutomationPreviewProps = {
  className?: string;
};

type FloatingCardConfig = {
  label: string;
  x: number;
  y: number;
};

const CARDS: FloatingCardConfig[] = [
  { label: "Automatisations", x: -220, y: -80 },
  { label: "Site web", x: 230, y: -60 },
  { label: "Dashboards", x: -180, y: 130 },
  { label: "CRM / Notifs", x: 210, y: 140 },
];

const CENTRAL_HALF_WIDTH = 80;

// style de ligne façon n8n (angles doux)
const buildPath = (card: FloatingCardConfig) => {
  const isLeft = card.x < 0;

  const startX = isLeft ? -CENTRAL_HALF_WIDTH : CENTRAL_HALF_WIDTH;
  const startY = 0;
  const endX = card.x;
  const endY = card.y;

  const midX = startX + (endX - startX) * 0.55;
  const controlY = startY + (endY - startY) / 2;

  return `M ${startX} ${startY}
          L ${midX} ${startY}
          Q ${midX} ${controlY} ${midX} ${endY}
          L ${endX} ${endY}`;
};

export default function AutomationPreview({ className }: AutomationPreviewProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [flashIndex, setFlashIndex] = useState<number | null>(null);

  // un flux lumineux aléatoire
  useEffect(() => {
    const id = setInterval(() => {
      const next = Math.floor(Math.random() * CARDS.length);
      setActiveIndex(next);

      // déclenche flash quand l’animation arrive au bloc (~1.4s après départ)
      setTimeout(() => {
        setFlashIndex(next);
        setTimeout(() => setFlashIndex(null), 300); // flash bref
      }, 1400);
    }, 2800);

    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={
        "pointer-events-none flex items-center justify-center " +
        (className ?? "")
      }
    >
      <motion.div
        className="relative h-[500px] w-[800px]"
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Bloc central */}
        <div className="absolute left-1/2 top-1/2 flex h-28 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-slate-900/95 shadow-xl shadow-slate-950/60 ring-1 ring-sky-500/40">
          <div className="flex flex-col items-start gap-1 px-4">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 text-[0.7rem] font-semibold text-slate-950 shadow-[0_0_18px_rgba(56,189,248,0.8)]">
              F
            </span>
            <div>
              <p className="text-[0.8rem] font-semibold text-slate-50">
                Ton entreprise
              </p>
            </div>
          </div>
        </div>

        {/* Lignes */}
        <svg
          className="absolute inset-0 overflow-visible"
          viewBox="-400 -250 800 500"
        >
          {/* ligne de base */}
          {CARDS.map((card) => (
            <path
              key={card.label + "-base"}
              d={buildPath(card)}
              fill="none"
              stroke="#334155"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.4}
              strokeDasharray="6 6"
            />
          ))}

          {/* flux lumineux unique */}
          {activeIndex !== null && (
            <motion.path
              key={CARDS[activeIndex].label + "-glow"}
              d={buildPath(CARDS[activeIndex])}
              fill="none"
              stroke="url(#glowGradient)"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="1 0"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 0] }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          )}

          <defs>
            <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Cartes */}
        {CARDS.map((card, index) => {
          const isFlashing = flashIndex === index;

          return (
            <motion.div
              key={card.label}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ x: card.x, y: card.y }}
            >
              <motion.div
                animate={
                  isFlashing
                    ? { scale: [1, 1.08, 1], boxShadow: ["0 0 0px #00ffff", "0 0 30px #22d3ee", "0 0 0px #00ffff"] }
                    : {}
                }
                transition={{ duration: 0.35 }}
                className={`inline-flex items-center gap-3 rounded-xl px-4 py-2.5 backdrop-blur-sm transition-all 
                ${isFlashing
                    ? "bg-slate-900/95 ring-1 ring-sky-400/90"
                    : "bg-slate-900/90 ring-1 ring-slate-700/50 shadow-slate-950/70"} 
                `}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-lg text-[0.7rem] transition-all 
                    ${isFlashing
                      ? "bg-gradient-to-br from-sky-400 to-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.8)]"
                      : "bg-slate-800 text-slate-100"}
                  `}
                >
                  ◦
                </span>
                <span className="text-[0.8rem] font-medium text-slate-50">
                  {card.label}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
