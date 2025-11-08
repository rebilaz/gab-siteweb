"use client";

import React from "react";
import { Facebook } from "lucide-react"; // ✅ icône élégante, nécessite `npm install lucide-react`

type FooterProps = {
  year: number;
  scrollTo: (selector: string) => void;
};

const Footer: React.FC<FooterProps> = ({ year, scrollTo }) => {
  const handleScrollClick =
    (selector: string) =>
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      scrollTo(selector);
    };

  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-6 text-[0.85rem] text-slate-600">
      <div className="w-full max-w-site mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Texte de gauche */}
          <p className="text-center sm:text-left text-slate-500">
            © {year} <span className="font-medium text-slate-700">Systèmes & Dashboards</span> — Gabriel Collot.  
            Tous droits réservés.
          </p>

          {/* Liens / Réseaux */}
          <div className="flex items-center gap-5">
            <a
              href="#top"
              onClick={handleScrollClick("top")}
              className="hover:text-emerald-600 transition"
            >
              Haut de page
            </a>

            <a
              href="#contact"
              onClick={handleScrollClick("#contact")}
              className="hover:text-emerald-600 transition"
            >
              Contact
            </a>

            {/* Lien Facebook */}
            <a
              href="https://www.facebook.com/tonprofil" // 🔗 remplace par ta vraie page
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-500 hover:text-sky-600 transition"
            >
              <Facebook className="h-4 w-4" />
              <span className="hidden sm:inline">Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
