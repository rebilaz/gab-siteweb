"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AuthSection } from "@/components/AuthSection";

const Header = () => {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 lg:px-6">
          {/* Logo cliquable → page principale */}
          <Link href="/" className="flex items-center">
            <Image
              src="/vexly-logo-2-full-gradient.svg"
              alt="Vexly logo"
              width={32}
              height={32}
              className="h-7 w-auto cursor-pointer"
              priority
            />
          </Link>

          {/* Navigation principale (desktop) */}
          <nav className="hidden items-center gap-6 text-xs font-medium text-slate-600 md:flex">
            {/* Solutions - dropdown */}
            <div className="relative group">
              <button
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 transition-colors hover:text-slate-900"
                type="button"
              >
                Solutions
                <span className="text-[9px]">▾</span>
              </button>

              {/* Panel dropdown */}
              <div className="pointer-events-none absolute left-0 top-full mt-3 w-[320px] rounded-xl border border-slate-200/80 bg-white/95 p-4 text-xs shadow-lg opacity-0 translate-y-1 transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Types de SaaS
                </div>
                <div className="mb-3 flex flex-col gap-1">
                  <Link
                    href="/solutions/saas-ia"
                    className="rounded-md px-2 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  >
                    SaaS IA
                  </Link>
                  <Link
                    href="/solutions/automation"
                    className="rounded-md px-2 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  >
                    SaaS d&apos;automation
                  </Link>
                  <Link
                    href="/solutions/seo"
                    className="rounded-md px-2 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  >
                    SaaS SEO
                  </Link>
                  <Link
                    href="/solutions/marketing"
                    className="rounded-md px-2 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  >
                    SaaS marketing
                  </Link>
                  <Link
                    href="/solutions/marketplaces"
                    className="rounded-md px-2 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  >
                    Plateformes &amp; marketplaces
                  </Link>
                  <Link
                    href="/solutions"
                    className="mt-1 rounded-md px-2 py-1.5 text-[11px] font-semibold text-indigo-600 hover:bg-indigo-50"
                  >
                    Voir toutes les solutions
                  </Link>
                </div>

                <div className="mt-2 border-t border-slate-100 pt-3">
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Pour qui ?
                  </div>
                  <div className="flex flex-col gap-1">
                    <Link
                      href="/personas/createurs"
                      className="rounded-md px-2 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    >
                      Pour créateurs
                    </Link>
                    <Link
                      href="/personas/freelances"
                      className="rounded-md px-2 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    >
                      Pour freelances
                    </Link>
                    <Link
                      href="/personas/entreprises"
                      className="rounded-md px-2 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    >
                      Pour entreprises
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/templates"
              className="transition-colors hover:text-slate-900"
            >
              Templates SaaS
            </Link>

            <Link
              href="/tarifs"
              className="transition-colors hover:text-slate-900"
            >
              Tarifs
            </Link>

            <Link
              href="/articles"
              className="transition-colors hover:text-slate-900"
            >
              Ressources
            </Link>

            <Link
              href="/faq"
              className="transition-colors hover:text-slate-900"
            >
              FAQ
            </Link>
          </nav>

          {/* Connexion + CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/connexion"
              className="hidden text-xs font-medium text-slate-600 transition-colors hover:text-slate-900 md:inline-block"
            >
              Connexion
            </Link>
            <button
              onClick={() => setAuthOpen(true)}
              className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-xs font-semibold text-white shadow-[0_18px_45px_rgba(88,80,236,0.55)] transition hover:brightness-110 hover:shadow-[0_22px_55px_rgba(88,80,236,0.65)] active:scale-[0.97]"
            >
              <span className="flex items-center gap-2">
                Créer mon SaaS
                <span className="text-sm">→</span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Modal Auth */}
      {authOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/40 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
            <button
              onClick={() => setAuthOpen(false)}
              className="absolute right-3 top-3 text-sm text-slate-400 transition hover:text-slate-600"
            >
              ✕
            </button>
            <AuthSection variant="modal" />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
