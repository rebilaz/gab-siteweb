"use client";

import React from "react";
import AutomationPreview from "./AutomationPreview";

type HeroProps = {
  scrollTo: (selector: string) => void;
};

const Hero: React.FC<HeroProps> = ({ scrollTo }) => {
  const handleScrollClick =
    (selector: string) =>
    (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      e.preventDefault();
      scrollTo(selector);
    };

  return (
    <section
      id="top"
      // 🔹 fond global blanc
      className="relative overflow-hidden border-b border-slate-200/60 bg-white"
    >
      {/* 🔹 halo gris clair sous l'animation, qui se fond vers le blanc */}
      <div
        className="
          pointer-events-none
          absolute inset-y-[-20%] right-[-25%] w-[100%]
          bg-[radial-gradient(circle_at_center,#ADACAC_0%,#E6E6E6_45%,rgba(255,255,255,0)_85%)]
        "
      />

      {/* 🔹 Animation à droite, en arrière-plan mais au-dessus du halo */}
      <div className="pointer-events-none absolute inset-y-0 right-[-20%] w-[100%] flex items-center justify-center z-10">
        <AutomationPreview className="h-full w-full max-w-none" />
      </div>

        {/* Contenu texte */}
        <div className="py-10 sm:py-14">
          <div className="w-full max-w-site mx-auto px-8 sm:px-16 lg:px-24">
            <div className="relative z-20 max-w-xl space-y-5">
              {/* En-tête / badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 bg-white/90 px-3 py-[0.4rem] text-[0.76rem] uppercase tracking-[0.14em] text-slate-600 font-medium shadow-sm">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Systèmes & automatisations</span>
                </span>
                <span className="text-[0.76rem] rounded-full bg-emerald-50 px-2.5 py-[0.3rem] text-emerald-700 font-medium">
                  +4–6 h / semaine gagnées
                </span>
              </div>

              {/* Titre principal */}
              <h1 className="text-[clamp(2.1rem,3.2vw+1rem,2.8rem)] leading-snug font-semibold text-slate-900">
                Je rends ton entreprise{" "}
                <span className="inline-block rounded-full bg-emerald-400 px-2 py-[0.05rem] text-slate-950 shadow-sm">
                  fluide et pilotable
                </span>
                .
              </h1>

              {/* Paragraphe intro */}
              <p className="text-[0.95rem] text-slate-700 leading-relaxed max-w-lg">
                On connecte tes outils, on automatise les tâches répétitives et on crée
                un dashboard simple pour suivre ton activité en temps réel — sans
                complexité inutile.
              </p>

              {/* Boutons + social proof */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleScrollClick("#contact")}
                    className="px-5 py-2.5 rounded-full border border-emerald-500 bg-emerald-500 text-slate-950 text-[0.88rem] font-medium hover:shadow-sm active:scale-[0.98] transition"
                  >
                    Discuter de ton système
                  </button>
                  <button
                    type="button"
                    onClick={handleScrollClick("#approach")}
                    className="px-4 py-2.5 rounded-full border border-slate-300 bg-white text-slate-800 text-[0.88rem] font-medium hover:bg-slate-100 active:scale-[0.98] transition"
                  >
                    Voir mon approche
                  </button>
                </div>

                {/* petites équipes */}
                <div className="flex items-center gap-2 text-[0.76rem] text-slate-600">
                  <div className="flex -space-x-1.5">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-[0.68rem] font-semibold">
                      +
                    </span>
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-[0.68rem] font-semibold">
                      3
                    </span>
                  </div>
                  <span>équipes déjà simplifiées</span>
                </div>
              </div>

              {/* Texte explicatif */}
              <div className="text-[0.82rem] text-slate-600 leading-relaxed">
                <p>
                  <span className="font-medium text-slate-900">
                    Tu m’expliques ton fonctionnement,
                  </span>{" "}
                  je te propose un système clair, automatisé et documenté.
                </p>
                <p>Pas de jargon, pas de promesses floues — juste du concret.</p>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Hero;
