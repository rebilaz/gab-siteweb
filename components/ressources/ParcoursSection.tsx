"use client";

import Link from "next/link";
import type { Parcours } from "./RessourcesClient";

export function ParcoursSection({ parcours }: { parcours: Parcours[] }) {
  return (
    <section className="mt-24">
      <header className="mb-8 border-b pb-4">
        <h3 className="text-lg font-bold">Suivez le guide</h3>
        <p className="text-sm text-slate-500">
          Des plans d&apos;action structurés
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {parcours.map((p) => (
          <Link
            key={p.slug}
            href={`/parcours/${p.slug}`}
            className="rounded-2xl border bg-white p-5 hover:shadow-md"
          >
            <h4 className="font-bold">{p.title}</h4>
            <p className="mt-2 text-xs text-slate-500">{p.desc}</p>
            <div className="mt-4 border-t pt-2 text-[10px] uppercase text-slate-400">
              {p.meta}
            </div>
          </Link>
        ))}
      </div>

      {/* CTA FINAL */}
      <div className="mt-24 rounded-3xl bg-slate-900 px-6 py-12 text-center text-white">
        <h2 className="text-2xl font-bold">Prêt à accélérer ?</h2>
        <p className="mt-3 text-sm text-slate-300">
          Démarrez un parcours structuré dès aujourd&apos;hui.
        </p>
        <Link
          href="/parcours/valider-une-idee"
          className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900"
        >
          Commencer
        </Link>
      </div>
    </section>
  );
}
