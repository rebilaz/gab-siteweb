"use client";

import React from "react";
import { motion } from "motion/react";
import { Search, TrendingUp } from "lucide-react";

type Props = {
  total: number;
  query: string;
  onQueryChange: (v: string) => void;
};

export default function ArticlesHero({ total, query, onQueryChange }: Props) {
  return (
    <header className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-4xl"
        >
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            Articles
          </h1>

          <p className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-3xl mt-3">
            Stratégies et méthodes concrètes pour construire et monétiser tes projets (SaaS, IA, automatisation…).
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2.5 bg-white rounded-xl border border-slate-200 shadow-sm">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <span className="text-slate-900 text-sm sm:text-base">
                {total} article{total > 1 ? "s" : ""}
              </span>
            </div>

            <div className="relative flex-1 w-full sm:max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="search"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Rechercher (titre, tag, sujet...)"
                className="w-full pl-12 pr-5 py-3 rounded-xl border border-slate-200 bg-white
                           text-slate-900 placeholder:text-slate-400 text-sm sm:text-base
                           focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400
                           shadow-sm hover:border-slate-300 transition-all"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
