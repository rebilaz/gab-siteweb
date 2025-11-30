"use client";

import React from "react";
import { Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type FooterProps = {
  year?: number;
};

const Footer: React.FC<FooterProps> = ({ year }) => {
  const currentYear = year ?? new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white pt-12 pb-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 md:flex-row md:items-start md:justify-between">

        {/* ----- Bloc gauche : logo + contact ----- */}
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/vexly-logo-2-full-gradient.svg"
              alt="VEXLY"
              width={32}
              height={32}
              className="h-7 w-auto"
            />
          </div>

          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              <a
                href="mailto:contact@vexly.fr"
                className="flex items-center gap-2 transition hover:text-indigo-600"
              >
                <Mail size={16} /> contact@vexly.fr
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition hover:text-indigo-600"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </li>
          </ul>
        </div>

        {/* ----- Bloc centre : navigation ----- */}
        <div className="flex flex-1 gap-10 text-sm text-slate-600">
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Produit
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/solutions" className="transition hover:text-indigo-600">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/templates" className="transition hover:text-indigo-600">
                  Templates SaaS
                </Link>
              </li>
              <li>
                <Link href="/tarifs" className="transition hover:text-indigo-600">
                  Tarifs
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Ressources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/articles" className="transition hover:text-indigo-600">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/faq" className="transition hover:text-indigo-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-indigo-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ----- Bloc droit : newsletter ----- */}
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-semibold text-slate-900">
            Reste informé
          </h3>
          <p className="mb-4 text-sm text-slate-600">
            Une fois par semaine, un email sur les SaaS clés en main, l&apos;IA
            & l&apos;automatisation.
          </p>

          <form
            className="flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(88,80,236,0.45)] transition hover:brightness-110"
            >
              S&apos;inscrire
            </button>
          </form>

          <p className="mt-2 text-xs text-slate-500">
            En vous inscrivant, vous acceptez notre{" "}
            <Link
              href="/politique-de-confidentialite"
              className="underline hover:text-indigo-600"
            >
              politique de confidentialité
            </Link>
            .
          </p>
        </div>
      </div>

      {/* ----- Bas de page ----- */}
      <div className="mt-8 border-t border-slate-200 pt-4">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs text-slate-500 md:flex-row">
          <span>© {currentYear} VEXLY — Tous droits réservés.</span>

          <div className="flex gap-4">
            <Link href="/mentions-legales" className="transition hover:text-indigo-600">
              Mentions légales
            </Link>
            <Link href="/conditions-generales" className="transition hover:text-indigo-600">
              CGU / CGV
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
