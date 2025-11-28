"use client";

import React from "react";
import { motion } from "motion/react";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";

// 👉 Import du header global
import Header  from "@/components/Header";

type ArticleSection = {
  id?: string;
  heading?: string;
  body: string;
};

type ArticleLayoutProps = {
  title: string;
  subtitle?: string;
  date: string;
  readingTime?: string;
  tags?: string[];
  niche?: string;
  coverImageUrl?: string;
  sections: ArticleSection[];
  backHref?: string;
};

export const ArticleLayout: React.FC<ArticleLayoutProps> = ({
  title,
  subtitle,
  date,
  readingTime,
  tags = [],
  niche,
  coverImageUrl,
  sections,
  backHref = "/",
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">

      {/* 👉 Ajout du Header global */}
      <Header niche={niche ?? "Article"} />

      {/* Header interne avec bouton Retour */}
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-xl mt-2">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 lg:px-8 py-4">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-indigo-600"
          >
            <ArrowLeft className="size-4" />
            Retour
          </Link>
          {niche && (
            <span className="text-xs font-semibold text-slate-600 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/70 uppercase tracking-wide">
              {niche}
            </span>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-4xl px-6 lg:px-8 py-10 lg:py-16">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8 mb-10"
        >
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
              Article
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-slate-600 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <div className="inline-flex items-center gap-2">
              <Calendar className="size-4" />
              <span>{date}</span>
            </div>
            {readingTime && (
              <div className="inline-flex items-center gap-2">
                <Clock className="size-4" />
                <span>{readingTime}</span>
              </div>
            )}
            {tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="size-4" />
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full bg-slate-100 text-xs font-medium text-slate-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Cover image */}
          {coverImageUrl && (
            <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-100/70">
              <img
                src={coverImageUrl}
                alt={title}
                className="w-full h-[260px] sm:h-[320px] object-cover"
              />
            </div>
          )}
        </motion.section>

        {/* Content */}
        <section className="space-y-10">
          {sections.map((section, index) => (
            <motion.article
              key={section.id ?? `${index}-${section.heading ?? "section"}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.45,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm shadow-slate-900/5"
            >
              {section.heading && (
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4">
                  {section.heading}
                </h2>
              )}
              <div className="prose prose-slate max-w-none prose-headings:scroll-mt-24">
                <p className="whitespace-pre-line leading-relaxed text-slate-700">
                  {section.body}
                </p>
              </div>
            </motion.article>
          ))}
        </section>

        {/* CTA final */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 sm:mt-16 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 sm:px-10 py-8 sm:py-10 text-white shadow-xl shadow-slate-900/40"
        >
          <div className="space-y-4 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold">
              Envie d’aller plus loin avec cette thématique ?
            </h3>
            <p className="text-slate-300 text-base sm:text-lg">
              Contacte-moi pour transformer cette idée en projet concret
              (site, outil, SaaS ou contenu approfondi).
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-slate-900 px-5 py-2.5 text-sm font-semibold hover:bg-slate-100 transition-colors"
            >
              Me contacter
            </Link>
          </div>
        </motion.section>
      </main>
    </div>
  );
};
