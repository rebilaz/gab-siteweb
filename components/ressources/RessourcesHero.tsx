"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function RessourcesHero() {
  return (
    <motion.header
      initial="hidden"
      animate="show"
      variants={container}
      className="mx-auto mb-20 max-w-3xl text-center font-sans"
    >
      <motion.span
        variants={item}
        className="mb-6 inline-block rounded-full border border-indigo-100 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-indigo-600"
      >
        Ressources & Guides
      </motion.span>

<motion.h1
  variants={item}
  className="
    text-4xl
    sm:text-6xl
    font-black
    tracking-[-0.04em]
    leading-[1.05]
    text-slate-900
  "
>
  Passez de l&apos;idée à l&apos;action.
  <br />
  <span className="block font-black text-slate-500">
    Sans vous disperser.
  </span>
</motion.h1>



      <motion.p
        variants={item}
        className="mx-auto mt-6 max-w-xl text-lg font-normal leading-relaxed text-slate-600"
      >
        Articles, méthodes et parcours guidés pour construire et scaler votre projet.
      </motion.p>

      <motion.div
        variants={item}
        className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
      >
        <Link
          href="/parcours"
          className="rounded-full bg-slate-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Choisir un parcours
        </Link>
        <Link
          href="/articles"
          className="rounded-full border border-slate-200 px-8 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
        >
          Explorer les articles
        </Link>
      </motion.div>
    </motion.header>
  );
}
