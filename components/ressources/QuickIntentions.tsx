"use client";

import Link from "next/link";

export function QuickIntentions({
  intentions,
}: {
  intentions: { label: string; href: string }[];
}) {
  return (
    <section className="mb-20">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Accès rapide selon votre besoin
      </p>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {intentions.map((i) => (
          <Link
            key={i.label}
            href={i.href}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium transition hover:border-indigo-200 hover:bg-indigo-50/30"
          >
            {i.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
