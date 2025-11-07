"use client";

import React from "react";

const Approach: React.FC = () => {
  return (
    <section
      id="approach"
      className="relative py-20 border-t border-slate-200 bg-[#4158F0]"
    >
      {/* Halo doux derrière la vidéo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(243,244,246,1)_0%,rgba(243,244,246,0.9)_30%,rgba(243,244,246,0.6)_60%,rgba(243,244,246,0)_100%)]" />

      <div className="relative w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-14 text-center">
        {/* En-tête */}
        <header className="mb-14">
          <p className="text-[0.9rem] uppercase tracking-[0.2em] text-slate-400 mb-3">
            Approche
          </p>
          <h2 className="text-[2.2rem] sm:text-[2.6rem] font-semibold text-slate-900">
            3 étapes pour un système fluide
          </h2>
          <p className="text-[1.05rem] text-slate-600 mt-3 max-w-2xl mx-auto">
            Simple, efficace et 100% adapté à ton fonctionnement.
          </p>
        </header>

        {/* Vidéo centrale */}
        <div className="relative mx-auto max-w-4xl aspect-video overflow-hidden rounded-3xl bg-slate-900 shadow-2xl shadow-slate-900/20 ring-1 ring-slate-300 mb-14">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/XXXXXXXX" // 🔁 remplace par ton lien
            title="Présentation de l'approche"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        {/* Étapes */}
        <div className="grid gap-10 sm:gap-12 md:grid-cols-3 text-left sm:text-center">
          {[
            {
              num: 1,
              title: "Audit rapide",
              text: "On identifie les blocages et les tâches à automatiser pour libérer ton temps.",
              color: "emerald",
            },
            {
              num: 2,
              title: "Système designé",
              text: "Je conçois un schéma clair et validé avant toute mise en place.",
              color: "sky",
            },
            {
              num: 3,
              title: "Automatisation & dashboard",
              text: "Tout est connecté, fluide et mesurable en un clin d’œil.",
              color: "emerald",
            },
          ].map((step) => (
            <div
              key={step.num}
              className="flex flex-col items-start sm:items-center"
            >
              <div
                className={`h-12 w-12 rounded-full border-2 border-${step.color}-400 text-${step.color}-600 flex items-center justify-center text-[1rem] font-semibold mb-4 shadow-sm bg-white`}
              >
                {step.num}
              </div>
              <h3 className="text-[1.2rem] font-semibold text-slate-900 mb-2">
                {step.title}
              </h3>
              <p className="text-[1rem] text-slate-600 leading-relaxed max-w-xs mx-auto">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Approach;
