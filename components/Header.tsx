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
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  // Effet "compact + shadow" quand on scrolle
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        "sticky top-0 z-30 transition-all duration-200",
        "backdrop-blur-xl",
        "bg-[rgba(245,245,247,0.92)]",
        scrolled ? "border-b border-[rgba(229,231,235,0.9)] shadow-sm" : "border-b border-transparent",
      ].join(" ")}
    >
      <div className="w-full max-w-site mx-auto px-4 sm:px-6">
        <nav
          className={[
            "flex items-center justify-between gap-4",
            scrolled ? "py-2.5" : "py-3.5",
            "transition-[padding] duration-200",
          ].join(" ")}
        >
          {/* Logo / marque */}
          <button
            type="button"
            onClick={() => scrollTo("top")}
            className="flex items-center gap-2 rounded-full px-1.5 -ml-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <div className="w-8 h-8 rounded-full bg-[radial-gradient(circle_at_30%_20%,#4f46e5,#111827)]" />
            <div className="text-left leading-tight">
              <div className="font-semibold text-[0.9rem]">
                Systèmes &amp; Dashboards
              </div>
              <div className="text-[0.75rem] text-text-muted">
                Automatisation &amp; data
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 text-[0.9rem]">
            <div className="flex items-center gap-4 text-text-muted">
              {navLinks.map((link) => (
                <a
                  key={link.target}
                  href={link.target}
                  onClick={handleScrollClick(link.target)}
                  className="relative inline-flex items-center py-1 hover:text-text-main transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-accent after:transition-[width] after:duration-150 hover:after:w-full"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <button
              type="button"
              onClick={handleScrollClick("#contact")}
              className="inline-flex items-center gap-1.5 rounded-full border border-accent bg-accent px-4 py-2 text-[0.85rem] text-slate-50 hover:shadow-sm active:scale-[0.98] transition"
            >
              <span>Parler de ton système</span>
            </button>
          </div>

          {/* Mobile nav toggle */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-full border border-border bg-white px-2.5 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-[3px]">
              <span className="block w-4 h-[2px] rounded-full bg-accent" />
              <span className="block w-4 h-[2px] rounded-full bg-accent" />
            </div>
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200 bg-[rgba(248,250,252,0.96)]">
            <div className="flex flex-col gap-1 py-2 text-sm">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  type="button"
                  onClick={handleScrollClick(link.target)}
                  className="text-left px-2.5 py-2 rounded-lg hover:bg-slate-100"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={handleScrollClick("#contact")}
                className="mt-1 mx-1 px-4 py-2 rounded-full border border-accent bg-accent text-slate-50 text-[0.85rem] hover:shadow-sm active:scale-[0.98] transition"
              >
                Parler de ton système
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
