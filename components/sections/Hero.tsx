"use client";

import React from "react";
import AutomationPreview from "./AutomationPreview";

type HeroProps = {
  scrollTo: (selector: string) => void;
};

const Hero: React.FC<HeroProps> = ({ scrollTo }) => {
  return (
    <section
      id="top"
      className="
        relative overflow-hidden border-b border-slate-200/60 bg-white
        min-h-[340px] sm:min-h-[400px] md:min-h-[600px]
        flex flex-col md:flex-row items-center justify-start md:justify-center
      "
    >
      {/* Halo desktop */}
      <div
        className="
          pointer-events-none
          hidden md:block
          absolute inset-y-[-20%] right-[-25%] w-[100%]
          bg-[radial-gradient(circle_at_center,#ADACAC_0%,#E6E6E6_45%,rgba(255,255,255,0)_85%)]
        "
      />

      {/* Halo mobile (optionnel, tu peux le garder ou l'ajuster) */}
      <div
        className="
          pointer-events-none
          block md:hidden
          absolute left-1/2 top-[62%]
          -translate-x-1/2
          w-[140%] h-[140px]
          bg-[radial-gradient(circle_at_center,#CFCFCF_0%,#E6E6E6_40%,rgba(255,255,255,0)_85%)]
        "
      />

      {/* Texte */}
      <div
        className="
          relative z-20 w-full max-w-site mx-auto
          px-6 sm:px-8 lg:px-24
          pt-16 md:pt-0
          text-center md:text-left
        "
      >
        <div className="max-w-xl mx-auto md:mx-0 space-y-4">
          {/* Badges */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 bg-white/90 px-3 py-[0.35rem] text-[0.7rem] uppercase tracking-[0.14em] text-slate-600 font-medium shadow-sm">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Systèmes & automatisations</span>
            </span>
            <span className="text-[0.7rem] rounded-full bg-emerald-50 px-2.5 py-[0.25rem] text-emerald-700 font-medium">
              +4–6 h / semaine gagnées
            </span>
          </div>

          {/* Titre principal */}
          <h1
            className="
              text-[clamp(1.4rem,3vw+0.8rem,2.6rem)]
              leading-snug font-semibold text-slate-900
              mt-1 md:mt-0
            "
          >
            Je rends ton entreprise{" "}
            <span className="inline-block rounded-full bg-emerald-400 px-2 py-[0.05rem] text-slate-950 shadow-sm">
              fluide et pilotable
            </span>
            .
          </h1>
        </div>
      </div>

      {/* Animation */}
      <div
        className="
          relative
          mt-2 md:mt-0
          w-full md:w-1/2
          flex justify-center md:justify-end
          pointer-events-none z-10
        "
      >
        {/* 👉 Conteneur qui ne prend presque pas de place en hauteur sur mobile */}
        <div
          className="
            relative
            h-[300px] w-[260px] sm:w-[320px]
            md:h-auto md:w-full
          "
        >
          <div
            className="
              absolute md:static
              left-1/2 md:left-auto
              top-0
              -translate-x-1/2 md:translate-x-0
              transform
              scale-[0.58] sm:scale-[0.68] md:scale-[0.85] lg:scale-100
              origin-top transition-transform duration-300
              -translate-y-3 sm:-translate-y-4 md:translate-y-0
            "
          >
            <AutomationPreview className="h-full w-full max-w-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
