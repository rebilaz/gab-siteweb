"use client";

import { motion } from "framer-motion";

type AutomationPreviewProps = {
  className?: string;
};

type FloatingCardConfig = {
  label: string;
  x: number;
  y: number;
  delay: number;
};

const CARDS: FloatingCardConfig[] = [
  { label: "Automatisations", x: -220, y: -80, delay: 0.4 },
  { label: "Site web", x: 230, y: -60, delay: 1.0 },
  { label: "Dashboards", x: -180, y: 130, delay: 1.6 },
  { label: "CRM / Notifs", x: 210, y: 140, delay: 2.2 },
];

// largeur approximative des blocs pour connecter proprement
const CENTRAL_HALF_WIDTH = 80;
const NODE_HALF_WIDTH = 90;

// chemin simple façon n8n : petit horizontal depuis le bloc central, puis courbe
const buildPath = (card: FloatingCardConfig) => {
  const isLeft = card.x < 0;

  // départ : au bord du bloc central (gauche ou droite), au milieu vertical
  const startX = isLeft ? -CENTRAL_HALF_WIDTH : CENTRAL_HALF_WIDTH;
  const startY = 0;

  // arrivée : juste avant le node (on ne rentre pas dedans)
  const endX = isLeft ? card.x + NODE_HALF_WIDTH : card.x - NODE_HALF_WIDTH;
  const endY = card.y;

  // points de contrôle pour courbe douce
  const cp1X = startX + (endX - startX) * 0.35;
  const cp2X = startX + (endX - startX) * 0.75;
  const cp1Y = startY;
  const cp2Y = endY;

  return `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
};

export default function AutomationPreview({ className }: AutomationPreviewProps) {
  return (
    <div
      className={
        "pointer-events-none relative h-full w-full " +
        (className ?? "")
      }
    >

        {/* bloc central */}
        <motion.div
          className="absolute left-1/2 top-1/2 flex h-28 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-slate-900/95 shadow-xl shadow-slate-950/60 ring-1 ring-sky-500/40"
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-start gap-1 px-4">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 text-[0.7rem] font-semibold text-slate-950 shadow-[0_0_18px_rgba(56,189,248,0.8)]">
              F
            </span>
            <div>
              <p className="text-[0.78rem] font-semibold text-slate-50">
                Flow central
              </p>
              <p className="text-[0.7rem] text-slate-400">Point de départ</p>
            </div>
          </div>
        </motion.div>

        {/* LIGNES sous les nodes */}
        <svg
          className="absolute inset-[8%] overflow-visible"
          viewBox="-400 -250 800 500"
        >
          {/* ligne de base */}
          {CARDS.map((card) => (
            <path
              key={card.label + "-base"}
              d={buildPath(card)}
              fill="none"
              stroke="#020617"
              strokeWidth={2.1}
              strokeLinecap="round"
              opacity={0.35}
            />
          ))}

          {/* trait lumineux animé */}
          {CARDS.map((card) => (
            <motion.path
              key={card.label + "-glow"}
              d={buildPath(card)}
              fill="none"
              stroke="url(#glowGradient)"
              strokeWidth={2.6}
              strokeLinecap="round"
              strokeDasharray="90 220"
              initial={{ strokeDashoffset: 220, opacity: 0 }}
              animate={{
                strokeDashoffset: [220, 0, -220],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                delay: card.delay,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
            />
          ))}

          <defs>
            <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.9" />
            </linearGradient>
          </defs>
        </svg>

        {/* cartes flottantes (nodes) */}
        {CARDS.map((card, index) => (
          <motion.div
            key={card.label}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ x: card.x, y: card.y }}
            animate={{ y: [card.y - 6, card.y + 6, card.y - 6] }}
            transition={{
              duration: 7 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="inline-flex items-center gap-3 rounded-xl bg-slate-900/90 px-4 py-2.5 shadow-lg shadow-slate-950/70 ring-1 ring-slate-700/50 backdrop-blur-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-[0.7rem] text-slate-100">
                ◦
              </span>
              <div className="flex flex-col">
                <span className="text-[0.8rem] font-medium text-slate-50">
                  {card.label}
                </span>
                <span className="text-[0.7rem] text-slate-400">
                  Bloc connecté
                </span>
              </div>
            </div>
          </motion.div>
        ))}
   </div>
  );
}
