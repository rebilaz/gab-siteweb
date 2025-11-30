"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Zap,
  Palette,
  Code2,
  Globe,
  HeadphonesIcon,
  Award,
} from "lucide-react";

const FeaturesSection: React.FC = () => {
  const FeatureCard: React.FC<{
    icon: React.ComponentType<any>;
    title: string;
    description: string;
  }> = ({ icon: Icon, title, description }) => (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-slate-900 text-white shadow-md">
        <Icon className="size-6" />
      </div>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </motion.div>
  );

  const features = [
    {
      icon: Zap,
      title: "Développement rapide",
      description: "MVP fonctionnel en 2 à 4 semaines.",
    },
    {
      icon: Palette,
      title: "Design moderne",
      description: "Interface propre, responsive et crédible.",
    },
    {
      icon: Code2,
      title: "Code propre",
      description: "Stack moderne (Next.js, TypeScript).",
    },
    {
      icon: Globe,
      title: "Déploiement inclus",
      description: "Mise en ligne + domaine configuré.",
    },
    {
      icon: HeadphonesIcon,
      title: "Support de démarrage",
      description: "Je reste dispo après la mise en ligne.",
    },
    {
      icon: Award,
      title: "Tu gardes le contrôle",
      description: "Produit livré, tu peux le faire évoluer.",
    },
  ];

  return (
    <section className="space-y-10">
      <div className="mx-auto max-w-2xl text-center space-y-3">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Tout ce qu&apos;il faut pour lancer
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Stack solide, design pro et accompagnement pour ne pas rester bloqué.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
