"use client";

import React from "react";

type HeaderProps = {
  scrollTo: (selector: string) => void;
};

const navLinks = [
  { label: "Approche", target: "#approach" },
  { label: "Contact", target: "#contact" },
];

const Header: React.FC<HeaderProps> = ({ scrollTo }) => {
  // Guard pour éviter le mismatch SSR / client
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  // autres states
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [lastScroll, setLastScroll] = React.useState(0);

  // Gestion de la visibilité du header selon le scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const isScrollingDown = currentScroll > lastScroll && currentScroll > 80;
      const isScrollingUp = currentScroll < lastScroll;

      if (isScrollingDown && !hidden) setHidden(true);
      else if (isScrollingUp && hidden) setHidden(false);

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll, hidden]);

  // Tant que ce n’est pas monté côté client, on ne rend rien
  if (!mounted) return null;

  const handleScrollClick =
    (selector: string) =>
    (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      e.preventDefault();
      scrollTo(selector);
      setMobileOpen(false);
    };

  return (
    <header
      className={[
        "fixed top-0 z-40 w-full transition-transform duration-300 ease-in-out",
        hidden ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      <div className="w-full max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* barre flottante */}
        <nav
          className={[
            "mt-3 mb-3 flex items-center justify-between gap-3",
            "rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm",
            "px-4 sm:px-6 py-2 sm:py-2.5",
          ].join(" ")}
        >
          {/* Nom / marque : juste "Gabriel Collot" */}
          <button
            type="button"
            onClick={() => scrollTo("top")}
            className="flex items-center gap-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            <div className="text-left leading-tight">
              <div className="font-semibold text-[1rem] text-slate-900 tracking-tight">
                Gabriel Collot
              </div>
            </div>
          </button>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center gap-6 text-[0.9rem]">
            <div className="flex items-center gap-4 text-slate-500">
              {navLinks.map((link) => (
                <a
                  key={link.target}
                  href={link.target}
                  onClick={handleScrollClick(link.target)}
                  className="relative inline-flex items-center py-1 leading-none hover:text-slate-900 transition-colors"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-emerald-400 rounded-full transition-[width] duration-150 hover:w-full" />
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={handleScrollClick("#contact")}
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-4 py-2 text-[0.85rem] font-medium text-slate-950 shadow-sm hover:bg-emerald-400 active:scale-[0.97] transition"
            >
              Parler de ton système
            </button>
          </div>

          {/* Bouton mobile */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-2.5 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
          >
            <div className="space-y-[3px]">
              <span
                className={[
                  "block h-[2px] w-4 rounded-full bg-slate-900 transition-transform duration-150",
                  mobileOpen ? "translate-y-[3px] rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "block h-[2px] w-4 rounded-full bg-slate-900 transition-transform duration-150",
                  mobileOpen ? "-translate-y-[3px] -rotate-45" : "",
                ].join(" ")}
              />
            </div>
          </button>
        </nav>
      </div>

      {/* Overlay mobile plein écran */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm">
          <div className="absolute inset-x-4 top-4 rounded-2xl bg-white shadow-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-left leading-tight">
                <div className="font-semibold text-[1rem] text-slate-900">
                  Gabriel Collot
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-full p-1.5 hover:bg-slate-100"
                aria-label="Fermer le menu"
              >
                <span className="block h-[2px] w-4 rotate-45 rounded-full bg-slate-700" />
                <span className="block -mt-[2px] h-[2px] w-4 -rotate-45 rounded-full bg-slate-700" />
              </button>
            </div>

            <div className="flex flex-col gap-1 py-1 text-sm">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  type="button"
                  onClick={handleScrollClick(link.target)}
                  className="text-left px-2.5 py-2 rounded-lg hover:bg-slate-100 text-slate-700"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={handleScrollClick("#contact")}
                className="mt-2 w-full px-4 py-2 rounded-full bg-emerald-500 text-slate-950 text-[0.85rem] font-medium hover:bg-emerald-400 active:scale-[0.98] transition"
              >
                Parler de ton système
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
