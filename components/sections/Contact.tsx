"use client";

import React, { useState } from "react";

type ContactProps = {
  onSubmit?: (data: FormData) => void;
};

const Contact: React.FC<ContactProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [teamSize, setTeamSize] = useState("");
  const [mainIssue, setMainIssue] = useState("");
  const [tools, setTools] = useState("");
  const [showWhatsAppCTA, setShowWhatsAppCTA] = useState(false);

  const handleWhatsApp = () => {
    const number = "YOUR_NUMBER_HERE"; // ← mets ton numéro au format 33612345678

    const message = `
Salut ! 👋

Je viens de remplir ton mini quiz système.

• Taille de l'équipe : ${teamSize || "non précisé"}
• Principal blocage : ${mainIssue || "non précisé"}
• Outils utilisés : ${tools || "non précisé"}

Est-ce que tu peux me dire si tu vois des choses à simplifier / automatiser ?
    `.trim();

    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

    if (onSubmit) {
      const formData = new FormData();
      formData.set("teamSize", teamSize);
      formData.set("mainIssue", mainIssue);
      formData.set("tools", tools);
      onSubmit(formData);
    }

    window.open(url, "_blank");
  };

  const handleSelect = (question: 1 | 2 | 3, value: string) => {
    if (question === 1) {
      setTeamSize(value);
      setStep(2);
    }

    if (question === 2) {
      setMainIssue(value);
      setStep(3);
    }

    if (question === 3) {
      setTools(value);
      setShowWhatsAppCTA(true);
    }
  };

  return (
    <section
      id="contact"
      className="py-12 sm:py-14 border-t border-slate-200 bg-slate-50"
    >
      <div className="w-full max-w-site mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Titre simple */}
        <h2 className="mb-6 text-center text-[1.7rem] sm:text-[2rem] font-semibold text-slate-900 tracking-tight">
          On regarde ton système en quelques clics
        </h2>

        {/* Carte du quizz */}
        <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-soft">
          {/* Progression */}
          <div className="mb-4 flex items-center justify-between text-[0.8rem] text-text-muted">
            <span>Question {step} sur 3</span>
            <div className="flex gap-1.5">
              {[1, 2, 3].map((s) => (
                <span
                  key={s}
                  className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                    s <= step ? "bg-emerald-500" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <div
            className={`
              rounded-xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5 space-y-4
              transition-all duration-300
              ${showWhatsAppCTA ? "shadow-md ring-1 ring-emerald-300/60" : ""}
            `}
          >
            {step === 1 && (
              <>
                <p className="text-[0.8rem] uppercase tracking-[0.14em] text-slate-500">
                  Étape 1
                </p>
                <h3 className="text-[1.02rem] font-semibold text-slate-900">
                  Quelle est la taille de ton équipe / activité ?
                </h3>
                <div className="mt-3 grid gap-2">
                  {[
                    "Je suis solo",
                    "2–5 personnes",
                    "6–15 personnes",
                    "Plus de 15",
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelect(1, option)}
                      className={`flex justify-between items-center rounded-lg border px-3 py-2.5 text-left text-[0.9rem] transition-all duration-200 active:scale-[0.99] ${
                        teamSize === option
                          ? "border-emerald-500 bg-emerald-50 text-slate-900"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <span>{option}</span>
                      <span
                        className={`h-3 w-3 rounded-full border transition-all ${
                          teamSize === option
                            ? "border-emerald-500 bg-emerald-500"
                            : "border-slate-300 bg-white"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <p className="text-[0.8rem] uppercase tracking-[0.14em] text-slate-500">
                  Étape 2
                </p>
                <h3 className="text-[1.02rem] font-semibold text-slate-900">
                  Où est-ce que tu perds le plus de temps aujourd’hui ?
                </h3>
                <div className="mt-3 grid gap-2">
                  {[
                    "Suivi des demandes / leads",
                    "Relances clients / factures",
                    "Organisation interne / tâches",
                    "Reporting / chiffres",
                    "Autre",
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelect(2, option)}
                      className={`flex justify-between items-center rounded-lg border px-3 py-2.5 text-left text-[0.9rem] transition-all duration-200 active:scale-[0.99] ${
                        mainIssue === option
                          ? "border-emerald-500 bg-emerald-50 text-slate-900"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <span>{option}</span>
                      <span
                        className={`h-3 w-3 rounded-full border transition-all ${
                          mainIssue === option
                            ? "border-emerald-500 bg-emerald-500"
                            : "border-slate-300 bg-white"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <p className="text-[0.8rem] uppercase tracking-[0.14em] text-slate-500">
                  Étape 3
                </p>
                <h3 className="text-[1.02rem] font-semibold text-slate-900">
                  Quels outils utilises-tu le plus au quotidien ?
                </h3>

                {!showWhatsAppCTA && (
                  <div className="mt-3 grid gap-2">
                    {[
                      "Notion",
                      "Airtable",
                      "Google Sheets / Excel",
                      "CRM (HubSpot, Pipedrive…)",
                      "Autre / mélange de tout",
                    ].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSelect(3, option)}
                        className={`flex justify-between items-center rounded-lg border px-3 py-2.5 text-left text-[0.9rem] transition-all duration-200 active:scale-[0.99] ${
                          tools === option
                            ? "border-emerald-500 bg-emerald-50 text-slate-900"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <span>{option}</span>
                        <span
                          className={`h-3 w-3 rounded-full border transition-all ${
                            tools === option
                              ? "border-emerald-500 bg-emerald-500"
                              : "border-slate-300 bg-white"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                )}

                {showWhatsAppCTA && (
                  <div className="mt-5 animate-[fadeIn_0.22s_ease-out]">
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="
                        w-full rounded-full 
                        bg-emerald-500 hover:bg-emerald-600 
                        text-slate-950 text-[0.95rem] font-semibold 
                        py-3.5 
                        transition-all duration-200 
                        shadow-md shadow-emerald-500/30
                        active:scale-[0.98]
                      "
                    >
                      M’envoyer ça sur WhatsApp
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Navigation bas : juste le lien retour */}
            <div className="flex justify-between items-center mt-2 text-[0.8rem] text-text-muted">
              <button
                type="button"
                disabled={step === 1}
                onClick={() => {
                  setShowWhatsAppCTA(false);
                  setStep((s) => Math.max(1, s - 1));
                }}
                className="hover:text-slate-700 disabled:opacity-40 disabled:cursor-default"
              >
                ← Question précédente
              </button>
              {/* pas de texte à droite */}
              <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
