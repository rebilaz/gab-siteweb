"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Filter, ChevronDown, X } from "lucide-react";

export type UiCluster = { id: string; label: string; count: number };

export default function ClusterBar({
  clusters,
  selected,
  onSelect,
  topCount = 4,
}: {
  clusters: UiCluster[];
  selected: string;
  onSelect: (id: string) => void;
  topCount?: number;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node;
      const inside =
        (menuRef.current && menuRef.current.contains(t)) ||
        (btnRef.current && btnRef.current.contains(t));
      if (!inside) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  const { top, more, selectedInMore } = useMemo(() => {
    const top = clusters.slice(0, topCount);
    const more = clusters.slice(topCount);
    const selectedInMore = selected !== "all" && more.some((c) => c.id === selected);
    return { top, more, selectedInMore };
  }, [clusters, selected, topCount]);

  return (
    <div className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <Filter className="h-4 w-4" />
            <span>Catégories</span>
          </div>

          {selected !== "all" && (
            <button
              onClick={() => onSelect("all")}
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 transition"
            >
              <X className="h-3.5 w-3.5" />
              Réinitialiser
            </button>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            onClick={() => onSelect("all")}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              selected === "all"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-50 text-slate-700 hover:bg-slate-100"
            }`}
          >
            Vue d&apos;ensemble
          </button>

          {top.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                onSelect(c.id);
                setOpen(false);
              }}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                selected === c.id
                  ? "bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-700/10"
                  : "bg-white text-slate-600 hover:bg-slate-50 ring-1 ring-slate-200/70"
            }`}
            >
              {c.label}
              <span className="ml-2 opacity-50 text-[10px]">{c.count}</span>
            </button>
          ))}

          {more.length > 0 && (
            <div className="relative">
              <button
                ref={btnRef}
                onClick={() => setOpen((v) => !v)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  open || selectedInMore
                    ? "bg-slate-900 text-white"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
                aria-expanded={open}
                aria-haspopup="menu"
              >
                + Plus
                <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
              </button>

              {open && (
                <div
                  ref={menuRef}
                  role="menu"
                  className="absolute right-0 mt-2 w-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
                >
                  <div className="px-3 py-2 text-xs font-semibold text-slate-500">
                    Autres catégories
                  </div>

                  <div className="max-h-[320px] overflow-auto p-2">
                    {more.map((c) => (
                      <button
                        key={c.id}
                        role="menuitem"
                        onClick={() => {
                          onSelect(c.id);
                          setOpen(false);
                        }}
                        className={`w-full rounded-xl px-3 py-2 text-left text-sm transition flex items-center justify-between ${
                          selected === c.id
                            ? "bg-indigo-50 text-indigo-700"
                            : "hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <span className="truncate">{c.label}</span>
                        <span className="ml-3 text-xs text-slate-400">{c.count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
