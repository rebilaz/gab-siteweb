"use client";

import { ParcoursHero } from "./ParcoursHero";
import { ParcoursCard } from "./ParcoursCard";

const PARCOURS = [
  {
    slug: "valider-une-idee",
    level: "Débutant → Intermédiaire",
    duration: "~2–3h",
    title: "Valider une idée de business",
    description:
      "Identifier un vrai problème, tester la demande et obtenir des signaux concrets avant de coder ou investir du temps.",
    steps: "6 étapes",
  },
];

export default function ParcoursClient() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <ParcoursHero />

      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {PARCOURS.map((p) => (
          <ParcoursCard key={p.slug} {...p} />
        ))}

        {/* Placeholder */}
        <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
          D’autres parcours arrivent bientôt
        </div>
      </section>
    </main>
  );
}
