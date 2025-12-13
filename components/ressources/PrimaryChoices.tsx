"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Parcours } from "./RessourcesClient";

export function PrimaryChoices({
  parcours,
  setHoveredSection,
}: {
  parcours: Parcours[];
  hoveredSection: "articles" | "parcours" | null;
  setHoveredSection: (v: "articles" | "parcours" | null) => void;
}) {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      <Link href="/articles">
        <motion.div
          onMouseEnter={() => setHoveredSection("articles")}
          onMouseLeave={() => setHoveredSection(null)}
          className="h-full rounded-3xl border bg-white p-8 hover:shadow-lg"
        >
          <h2 className="text-xl font-bold">Articles</h2>
          <p className="mt-2 text-sm text-slate-500">
            Base de connaissances tech, business et produit.
          </p>
        </motion.div>
      </Link>

      <Link href="/parcours">
        <motion.div
          onMouseEnter={() => setHoveredSection("parcours")}
          onMouseLeave={() => setHoveredSection(null)}
          className="h-full rounded-3xl border bg-white p-8 hover:shadow-lg"
        >
          <h2 className="text-xl font-bold">Parcours guidés</h2>
          <ul className="mt-4 space-y-2 text-xs text-slate-500">
            {parcours.slice(0, 2).map((p) => (
              <li key={p.slug}>• {p.title}</li>
            ))}
            <li className="text-slate-400">+ autres</li>
          </ul>
        </motion.div>
      </Link>
    </section>
  );
}
