"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

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
    const number = "YOUR_NUMBER_HERE"; // format 33612345678
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

  const progress = (step / 3) * 100;

  const goBack = () => {
    setShowWhatsAppCTA(false);
    setStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <section
      id="contact"
      className="py-14 border-t border-slate-200 bg-slate-50 font-sans"
    >
      <div className="w-full max-w-site mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Carte du quiz */}
        <div className="relative w-full max-w-xl rounded-2xl border border-slate-200 bg-white px-5 sm:px-8 py-8 sm:py-10 shadow-lg shadow-slate-200/50">
          {/* Barre de progression */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-200/70 rounded-t-2xl overflow-hidden">
            <motion.div
              className="h-full bg-emerald-500 rounded-t-2xl"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          {/* Flèche retour */}
          {step > 1 && (
            <button
              onClick={goBack}
              className="absolute top-4 left-4 flex items-center gap-1 text-slate-500 hover:text-slate-800 transition"
            >
              <ArrowLeft size={18} strokeWidth={2} />
              <span className="text-[0.85rem] font-medium">Retour</span>
            </button>
          )}

          {/* Contenu du quiz */}
          <div
            className={`mt-2 sm:mt-4 transition-all duration-300 flex flex-col items-center text-center ${
              showWhatsAppCTA ? "ring-1 ring-emerald-300/60 rounded-2xl" : ""
            }`}
          >
            {step === 1 && (
              <>
                <h3 className="text-[1.3rem] sm:text-[1.5rem] font-semibold text-slate-900 mb-6">
                  Quelle est la taille de ton équipe ?
                </h3>
                <div className="w-full max-w-md grid gap-4">
                  {["Je suis solo", "2–5 personnes", "6–15 personnes", "Plus de 15"].map(
                    (option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSelect(1, option)}
                        className={`rounded-xl border px-5 py-4 sm:py-5 text-[1rem] sm:text-[1.05rem] font-medium transition-all duration-200 active:scale-[0.98] ${
                          teamSize === option
                            ? "border-emerald-500 bg-emerald-50 text-slate-900 shadow-sm"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="text-[1.3rem] sm:text-[1.5rem] font-semibold text-slate-900 mb-6">
                  Où perds-tu le plus de temps aujourd’hui ?
                </h3>
                <div className="w-full max-w-md grid gap-4">
                  {[
                    "Suivi des demandes / leads",
                    "Relances clients / factures",
                    "Organisation interne / tâches",
                    "Reporting / chiffres",
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelect(2, option)}
                      className={`rounded-xl border px-5 py-4 sm:py-5 text-[1rem] sm:text-[1.05rem] font-medium transition-all duration-200 active:scale-[0.98] ${
                        mainIssue === option
                          ? "border-emerald-500 bg-emerald-50 text-slate-900 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h3 className="text-[1.3rem] sm:text-[1.5rem] font-semibold text-slate-900 mb-6">
                  Quels outils utilises-tu le plus ?
                </h3>
                {!showWhatsAppCTA && (
                  <div className="w-full max-w-md grid gap-4">
                    {[
                      "Notion",
                      "Airtable",
                      "Google Sheets / Excel",
                      "CRM / Autre mélange",
                    ].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSelect(3, option)}
                        className={`rounded-xl border px-5 py-4 sm:py-5 text-[1rem] sm:text-[1.05rem] font-medium transition-all duration-200 active:scale-[0.98] ${
                          tools === option
                            ? "border-emerald-500 bg-emerald-50 text-slate-900 shadow-sm"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
                {showWhatsAppCTA && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8 w-full max-w-md"
                  >
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="w-full rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-[1rem] font-semibold py-3.5 transition-all duration-200 shadow-md shadow-emerald-500/30 active:scale-[0.98]"
                    >
                      M’envoyer ça sur WhatsApp
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
