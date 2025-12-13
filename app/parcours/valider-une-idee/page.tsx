"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  Flame,
  Swords,
  Shield,
  Sparkle,
} from "lucide-react";

type Quest = {
  step: number;
  title: string;
  href: string;
  difficulty: "Facile" | "Moyen" | "Difficile";
  reward: string;
};

const STORAGE_KEY = "vexly:parcours:valider-une-idee:min:v2";

const QUESTS: Quest[] = [
  {
    step: 1,
    title: "Identifier un vrai problème",
    href: "/articles/identifier-un-vrai-probleme",
    difficulty: "Facile",
    reward: "Clarté",
  },
  {
    step: 2,
    title: "Trouver une idée rentable",
    href: "/articles/trouver-une-idee-rentable",
    difficulty: "Moyen",
    reward: "Angle",
  },
  {
    step: 3,
    title: "Tester la demande rapidement",
    href: "/articles/tester-la-demande-rapidement",
    difficulty: "Moyen",
    reward: "Signal",
  },
  {
    step: 4,
    title: "Landing de validation",
    href: "/articles/landing-page-de-validation",
    difficulty: "Facile",
    reward: "Preuve",
  },
  {
    step: 5,
    title: "Signaux forts & préventes",
    href: "/articles/preventes-signaux-forts",
    difficulty: "Difficile",
    reward: "Go/No-go",
  },
  {
    step: 6,
    title: "Erreurs à éviter",
    href: "/articles/erreurs-validation-idee",
    difficulty: "Facile",
    reward: "Lucidité",
  },
];

type ProgressState = { done: Record<number, boolean> };

function loadState(): ProgressState {
  if (typeof window === "undefined") return { done: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { done: {} };
    const parsed = JSON.parse(raw) as ProgressState;
    return { done: parsed.done ?? {} };
  } catch {
    return { done: {} };
  }
}

function saveState(state: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

function DifficultyIcon({ d }: { d: Quest["difficulty"] }) {
  if (d === "Facile") return <Shield className="w-4 h-4" />;
  if (d === "Moyen") return <Swords className="w-4 h-4" />;
  return <Flame className="w-4 h-4" />;
}

export default function Page() {
  const router = useRouter();
  const [state, setState] = React.useState<ProgressState>({ done: {} });

  React.useEffect(() => setState(loadState()), []);

  const doneCount = React.useMemo(
    () => QUESTS.filter((q) => state.done[q.step]).length,
    [state],
  );

  const progressPct = React.useMemo(
    () => Math.round((doneCount / QUESTS.length) * 100),
    [doneCount],
  );

  const nextQuest = React.useMemo(
    () => QUESTS.find((q) => !state.done[q.step]) ?? QUESTS[QUESTS.length - 1],
    [state],
  );

  function toggleDone(step: number) {
    setState((prev) => {
      const next = { done: { ...prev.done, [step]: !prev.done[step] } };
      saveState(next);
      return next;
    });
  }

  function reset() {
    const cleared: ProgressState = { done: {} };
    setState(cleared);
    saveState(cleared);
  }

  return (
    <main className="mx-auto max-w-5xl px-6 lg:px-8 py-14 sm:py-16">
      {/* HERO */}
      <header className="max-w-3xl">
        <span className="text-xs uppercase tracking-wide text-indigo-600 font-medium">
          Parcours
        </span>

        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
          Valider une idée <span className="text-slate-500 font-normal">(avant de coder)</span>
        </h1>

        {/* Progress (minimal) */}
        <div className="mt-7">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-700 font-medium">
              {doneCount}/{QUESTS.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">{progressPct}%</span>
              <button
                onClick={reset}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href={nextQuest.href}
              className="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
            >
              Continuer <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/parcours"
              className="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-white transition"
            >
              Tous les parcours
            </Link>
          </div>
        </div>
      </header>

      {/* QUESTS */}
      <section className="mt-10 sm:mt-12">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-4">
          Quêtes
        </h2>

        <ol className="space-y-3">
          {QUESTS.map((q) => {
            const isDone = !!state.done[q.step];

            return (
              <li key={q.step}>
                <div
                  className={`group rounded-2xl border bg-white transition hover:shadow-md
                    ${isDone ? "border-emerald-200" : "border-slate-200"}`}
                >
                  <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300 group-hover:text-slate-400 transition-colors" />
                      )}

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs uppercase tracking-wide text-indigo-600 font-medium">
                            Quête {q.step}
                          </span>

                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-50 text-slate-600 border border-slate-200 inline-flex items-center gap-1.5">
                            <DifficultyIcon d={q.difficulty} />
                            {q.difficulty}
                          </span>

                          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 inline-flex items-center gap-1.5">
                            <Sparkle className="w-3.5 h-3.5" />
                            {q.reward}
                          </span>
                        </div>

                        <h3 className="mt-1 text-base sm:text-lg font-semibold text-slate-900 truncate">
                          {q.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:justify-end">
                      <button
                        onClick={() => toggleDone(q.step)}
                        className={`text-sm px-3 py-2 rounded-xl border transition
                          ${
                            isDone
                              ? "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                              : "border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                      >
                        {isDone ? "Fait ✓" : "Marquer fait"}
                      </button>

                      <button
                        onClick={() => router.push(q.href)}
                        className="text-sm px-3 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition inline-flex items-center gap-2"
                      >
                        Lire <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </main>
  );
}
