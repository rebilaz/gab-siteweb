"use client";

import React from "react";
import { motion } from "motion/react";
import  Header  from "@/components/Header";
import {
  ArrowRight,
  Check,
  Sparkles,
  Zap,
  Shield,
  Rocket,
  Code2,
  Palette,
  Globe,
  HeadphonesIcon,
  Award,
} from "lucide-react";

type CTAProps = {
  label: string;
  niche: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
};

type Section = {
  id?: string;
  title: string;
  text?: string;
  bullets?: string[];
};

type LandingLayoutProps = {
  niche: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCtaLabel: string;
  sections: Section[];
  onPrimaryCtaClick?: () => void;
};

// Design System - CTA Button Component
const Button: React.FC<CTAProps> = ({
  label,
  niche,
  onClick,
  variant = "primary",
  fullWidth = false,
}) => {
  const handleClick = () => {
    console.log(`CTA clicked - ${niche}`);
    if (onClick) onClick();
  };

  const baseClasses =
    "group relative inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const widthClass = fullWidth ? "w-full sm:w-auto" : "";

  if (variant === "secondary") {
    return (
      <motion.button
        id={`cta-${niche.toLowerCase()}`}
        data-niche={niche}
        onClick={handleClick}
        className={`${baseClasses} ${widthClass} bg-white text-slate-900 hover:bg-slate-50 shadow-lg shadow-slate-900/10 hover:shadow-xl hover:shadow-slate-900/15 focus:ring-white`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {label}
        <ArrowRight className="size-[18px] transition-transform group-hover:translate-x-0.5" />
      </motion.button>
    );
  }

  return (
    <motion.button
      id={`cta-${niche.toLowerCase()}`}
      data-niche={niche}
      onClick={handleClick}
      className={`${baseClasses} ${widthClass} bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white overflow-hidden shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/40 focus:ring-indigo-500`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        backgroundSize: "200% 100%",
      }}
    >
      {/* Subtle shimmer on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
        }}
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut",
        }}
      />
      <span className="relative z-10">{label}</span>
      <ArrowRight className="relative z-10 size-5 transition-transform group-hover:translate-x-1" />
    </motion.button>
  );
};

// Design System - Badge Component
const Badge = ({ icon: Icon, label }: { icon?: any; label: string }) => (
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200/80 shadow-sm">
    {Icon && <Icon className="size-4 text-slate-700" />}
    <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
      {label}
    </span>
  </div>
);

// Design System - Feature Card Component
const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="group relative rounded-2xl bg-white border border-slate-200/60 p-8 hover:border-indigo-200 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-100/50"
  >
    {/* Gradient glow on hover */}
    <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-indigo-500/0 via-violet-500/0 to-indigo-500/0 group-hover:from-indigo-500/10 group-hover:via-violet-500/5 group-hover:to-indigo-500/10 transition-all duration-500 -z-10" />

    <div className="relative z-10 space-y-4">
      <div className="inline-flex items-center justify-center size-14 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-lg shadow-slate-900/20 group-hover:shadow-xl group-hover:shadow-slate-900/30 group-hover:scale-105 transition-all duration-300">
        <Icon className="size-6" />
      </div>
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

// Design System - Step Item Component
const StepItem = ({
  step,
  text,
  time,
  delay = 0,
}: {
  step: string;
  text: string;
  time: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    className="flex items-start gap-4 group relative"
  >
    {/* Timeline connector */}
    {step !== "4" && (
      <div className="absolute left-4 top-12 w-0.5 h-8 bg-gradient-to-b from-slate-300 to-transparent" />
    )}

    <div className="flex-shrink-0 size-8 rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center font-bold text-slate-700 group-hover:from-indigo-50 group-hover:to-violet-50 group-hover:border-indigo-200 group-hover:text-indigo-600 transition-all duration-300 shadow-sm">
      {step}
    </div>
    <div className="flex-1 pt-0.5">
      <p className="text-slate-800 font-medium leading-relaxed">{text}</p>
      <span className="inline-block mt-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
        {time}
      </span>
    </div>
  </motion.div>
);

// Design System - Trust Indicator Component
const TrustIndicator = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2">
    <div className="size-5 rounded-full bg-green-500 flex items-center justify-center shadow-sm shadow-green-500/30">
      <Check className="size-3 text-white" strokeWidth={3} />
    </div>
    <span className="text-slate-700 font-medium">{label}</span>
  </div>
);

// 👉 Nouveau template utilisé sous le même nom : LandingLayout
export const LandingLayout: React.FC<LandingLayoutProps> = ({
  niche,
  heroTitle,
  heroSubtitle,
  primaryCtaLabel,
  sections,
  onPrimaryCtaClick,
}) => {
      return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <Header niche={niche} />
 
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 lg:px-8 pb-24 pt-12 lg:pt-16 space-y-24 lg:space-y-32">
        {/* Hero Section - 2 Columns */}
        <section className="grid lg:grid-cols-[1.3fr,1fr] gap-12 lg:gap-16 items-start">
          {/* Left Column - Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <Badge icon={Zap} label="Développement rapide" />

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                {heroTitle}
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
                {heroSubtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              <Button
                label={primaryCtaLabel}
                niche={niche}
                onClick={onPrimaryCtaClick}
              />
              <motion.a
                href="#process"
                className="inline-flex items-center gap-2 text-slate-700 hover:text-indigo-600 transition-colors font-semibold group"
                whileHover={{ x: 4 }}
              >
                Voir le process
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-8 border-t border-slate-200">
              <TrustIndicator label="Code propriétaire" />
              <TrustIndicator label="Livraison garantie" />
              <TrustIndicator label="Support inclus" />
            </div>
          </motion.div>

          {/* Right Column - Process Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            id="process"
            className="relative rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-sm p-8 shadow-2xl shadow-slate-900/5 lg:sticky lg:top-24"
          >
            {/* Subtle gradient background */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-50/50 via-transparent to-indigo-50/30 -z-10" />

            <div className="space-y-8">
              <div className="flex items-center gap-3 pb-2">
                <div className="size-12 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <Rocket className="size-6 text-white" />
                </div>
                <h3 className="font-bold text-slate-900">
                  Comment ça se passe ?
                </h3>
              </div>

              <div className="space-y-6">
                <StepItem
                  step="1"
                  text="Appel rapide pour comprendre ton idée"
                  time="30 min"
                  delay={0.3}
                />
                <StepItem
                  step="2"
                  text="Maquette + scope clair (sans bla-bla technique)"
                  time="2-3 jours"
                  delay={0.4}
                />
                <StepItem
                  step="3"
                  text="Développement et itérations régulières"
                  time="2-4 semaines"
                  delay={0.5}
                />
                <StepItem
                  step="4"
                  text="Livraison + déploiement + support de démarrage"
                  time="Inclus"
                  delay={0.6}
                />
              </div>

              <div className="pt-6 border-t border-slate-200">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-slate-50 to-indigo-50/50 border border-slate-200/50">
                  <Shield className="size-5 flex-shrink-0 text-indigo-600 mt-0.5" />
                  <p className="text-slate-700 font-medium leading-relaxed">
                    Tu gardes le contrôle sur le produit, je gère la technique.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section - 3 Column Grid */}
        <section className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Tout ce dont tu as besoin pour lancer
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Stack moderne, design professionnel, et fonctionnalités essentielles
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <FeatureCard
              icon={Zap}
              title="Développement rapide"
              description="De l'idée au produit live en 2-4 semaines maximum"
            />
            <FeatureCard
              icon={Palette}
              title="Design moderne"
              description="UI/UX professionnel et responsive sur tous les écrans"
            />
            <FeatureCard
              icon={Code2}
              title="Code de qualité"
              description="Architecture scalable avec Next.js et TypeScript"
            />
            <FeatureCard
              icon={Globe}
              title="Déploiement inclus"
              description="Mise en production sur Vercel avec domaine personnalisé"
            />
            <FeatureCard
              icon={HeadphonesIcon}
              title="Support post-launch"
              description="Accompagnement pendant les premières semaines"
            />
            <FeatureCard
              icon={Award}
              title="Tu es propriétaire"
              description="Code source livré, hébergement sous ton contrôle"
            />
          </div>
        </section>

        {/* Content Sections */}
        <section className="space-y-8 lg:space-y-10">
          {sections.map((section, idx) => (
            <motion.div
              key={section.id ?? `${section.title}-${idx}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mx-auto max-w-3xl rounded-3xl bg-white border border-slate-200/80 p-8 lg:p-12 shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:border-slate-300"
            >
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                  {section.title}
                </h2>
                {section.text && (
                  <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-line">
                    {section.text}
                  </p>
                )}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="space-y-3 pt-2">
                    {section.bullets.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        className="flex items-start gap-3 text-slate-700"
                      >
                        <div className="size-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check
                            className="size-4 text-green-600"
                            strokeWidth={2.5}
                          />
                        </div>
                        <span className="leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </section>

        {/* Final CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-12 lg:px-16 lg:py-20 text-white overflow-hidden shadow-2xl shadow-slate-900/50"
        >
          {/* Background patterns */}
          <div className="absolute inset-0 opacity-[0.08]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Gradient orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
            <div className="space-y-5 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                Prêt à lancer ton SaaS ?
              </h2>
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                Discutons de ton projet. Je te dirai exactement ce qui est
                possible, dans quel délai et pour quel budget. Aucun engagement.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button
                label={primaryCtaLabel}
                niche={niche}
                onClick={onPrimaryCtaClick}
                variant="secondary"
                fullWidth={true}
              />
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Sparkles className="size-5 text-white" />
              </div>
              <span className="font-bold text-slate-900">
                © {new Date().getFullYear()} SaaS Builder
              </span>
            </div>
            <span className="text-slate-500 font-medium">
              Construit avec Next.js, Tailwind & Motion
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
