"use client";

import React from "react";
import type { UiCluster } from "./ArticlesIndexClient";

type Props = {
  clusters: UiCluster[];
  selected: string;
  onSelect: (id: string) => void;
};

export default function ClusterBar({ clusters, selected, onSelect }: Props) {
  return (
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
          <button
            onClick={() => onSelect("all")}
            className={`px-4 py-2 rounded-xl text-sm border transition-all whitespace-nowrap
              ${
                selected === "all"
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
          >
            Tous
          </button>

          {clusters.map((c) => {
            const active = selected === c.id;
            return (
              <button
                key={c.id}
                onClick={() => onSelect(c.id)}
                className={`px-4 py-2 rounded-xl text-sm border transition-all whitespace-nowrap flex items-center gap-2
                  ${
                    active
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                title={`${c.count} article${c.count > 1 ? "s" : ""}`}
              >
                <span>{c.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${active ? "bg-white/20" : "bg-slate-100"}`}>
                  {c.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
