"use client";

import { useState } from "react";
import Image from "next/image";
import { AuthSection } from "@/components/AuthSection";

type HeaderProps = {
  niche: string;
};

const navItems = [
  { label: "Produit", href: "#product" },
  { label: "Process", href: "#process" },
  { label: "Projets", href: "#projects" },
  { label: "FAQ", href: "#faq" },
];

const Header = ({ niche }: HeaderProps) => {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 lg:px-6">

          {/* Logo seul */}
          <div className="flex items-center gap-2">
            <Image
              src="/vexly-logo-2-full-gradient.svg"
              alt="Vexly logo"
              width={32}
              height={32}
              className="h-7 w-auto"
              priority
            />
            <span className="text-sm font-semibold text-slate-900">
              VEXLY
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden items-center gap-6 text-xs font-medium text-slate-600 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-slate-900"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAuthOpen(true)}
              className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98]"
            >
              Commencer
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
