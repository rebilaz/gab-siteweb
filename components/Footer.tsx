"use client";

import React from "react";
import { Linkedin, Mail } from "lucide-react";
import Image from "next/image";

type FooterProps = {
  year: number;
};

const Footer: React.FC<FooterProps> = ({ year }) => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-10 pb-6">
      <div className="max-w-site mx-auto px-6 sm:px-10 grid md:grid-cols-2 gap-10">
        {/* Bloc gauche */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.svg" // remplace par ton image dans public/
              alt="Logo Automation"
              width={28}
              height={28}
            />
            <span className="font-semibold text-lg text-slate-900">AUTOMATION</span>
          </div>

          <ul className="text-sm text-slate-600 space-y-1">
            <li>
              <a href="mailto:contact@automation.fr" className="hover:underline flex items-center gap-1">
                <Mail size={16} /> contact@automation.fr
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener" className="hover:underline flex items-center gap-1">
                <Linkedin size={16} /> LinkedIn
              </a>
            </li>
          </ul>
        </div>

        {/* Bloc droit : newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Restez informé</h3>
          <p className="text-sm text-slate-600 mb-4">
            Recevez nos conseils et actualités sur le reporting automatisé pour PME.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 flex-1"
            />
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 transition text-white text-sm font-semibold px-5 py-2 rounded-lg"
            >
              S’inscrire
            </button>
          </form>
          <p className="text-xs text-slate-500 mt-2">
            Consultez notre <a href="#" className="underline">politique</a>.
          </p>
        </div>
      </div>

      {/* Bas de page */}
      <div className="text-center text-xs text-slate-500 border-t mt-10 pt-4">
        Tous droits réservés © {year}
      </div>
    </footer>
  );
};

export default Footer;
