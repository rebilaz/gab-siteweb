"use client";

import React from "react";
import {
  motion,
  useScroll,
  useSpring,
  useInView,
} from "motion/react";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import Header from "@/components/Header";

type ArticleSection = {
  id?: string;
  heading?: string;
  body: string; // MARKDOWN
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

/**
 * Sous-composant : une section observée individuellement
 * (pour mettre à jour l'index actif quand elle entre dans le viewport)
 */
type ObservedSectionProps = {
  section: ArticleSection;
  index: number;
  setActiveIndex: (i: number) => void;
};

const ObservedSection: React.FC<ObservedSectionProps> = ({
  section,
  index,
  setActiveIndex,
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const inView = useInView(ref, {
    margin: "-40% 0px -40% 0px",
    amount: 0.4,
  });

  React.useEffect(() => {
    if (inView) setActiveIndex(index);
  }, [inView, index, setActiveIndex]);

  return (
    <motion.article
      ref={ref}
      id={section.id}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="max-w-3xl"
    >
      {section.heading && (
        <h2 className="mb-4 text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-slate-900">
          {section.heading}
        </h2>
      )}

      <ReactMarkdown
        components={{
          p: ({ children }) => (
            <p className="mb-4 text-[15px] leading-relaxed text-slate-700">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 ml-5 list-disc space-y-1 text-[15px] text-slate-700">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 ml-5 list-decimal space-y-1 text-[15px] text-slate-700">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-900">
              {children}
            </strong>
          ),
        }}
      >
        {section.body}
      </ReactMarkdown>
    </motion.article>
  );
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
  // Progress global sur la page
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.2,
  });

  // Index du chapitre “actif” (pour les ronds à gauche)
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header global */}
      <Header niche={niche ?? "Article"} />

      {/* Header interne */}
      <header className="mt-2 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 lg:px-8 py-3">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-indigo-600"
          >
            <ArrowLeft className="size-4" />
            Retour
          </Link>
          {niche && (
            <span className="rounded-full border border-slate-200/70 bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
              {niche}
            </span>
          )}
        </div>
      </header>

      {/* Timeline FIXE collée à gauche (desktop) */}
      {sections.length > 0 && (
        <div className="pointer-events-none fixed left-6 top-28 bottom-10 z-20 hidden md:flex flex-col items-start">
          <div className="relative h-full w-[2px] bg-slate-200">
            {/* Ligne colorée qui descend avec le scroll */}
            <motion.div
              style={{ scaleY: progress }}
              className="absolute left-0 top-0 w-[2px] origin-top rounded-full bg-indigo-500"
            />

            {/* Ronds + labels */}
            {sections.map((section, index) => {
              const topPercent =
                sections.length === 1
                  ? 0
                  : (index / (sections.length - 1)) * 100;

              const isActive = index === activeIndex;

              return (
                <div
                  key={section.id ?? index}
                  className="absolute -left-[7px] flex flex-col items-start"
                  style={{ top: `${topPercent}%` }}
                >
                  <div
                    className={`h-4 w-4 rounded-full border-[2px] transition-colors ${
                      isActive
                        ? "bg-indigo-500 border-indigo-500"
                        : "bg-white border-indigo-300"
                    }`}
                  />
                  {section.heading && (
                    <div
                      className={`mt-2 ml-5 w-44 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                        isActive ? "text-indigo-600" : "text-slate-400"
                      }`}
                    >
                      {section.heading}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* main (conteneur plus large et décalé à droite) */}
      <main className="mx-auto max-w-5xl px-8 lg:px-16 py-10 lg:py-14 md:pl-28">
        {/* intro */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 space-y-6"
        >
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Article
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
              {title}
            </h1>
            {subtitle && (
              <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-slate-600">
                {subtitle}
              </p>
            )}
          </div>

          {/* meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-500">
            <div className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              <span>{date}</span>
            </div>

            {readingTime && (
              <>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <div className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  <span>{readingTime}</span>
                </div>
              </>
            )}

            {tags.length > 0 && (
              <>
                <span className="hidden sm:inline h-1 w-1 rounded-full bg-slate-300" />
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="size-3.5" />
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* cover */}
          {coverImageUrl && (
            <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-100/60">
              <img
                src={coverImageUrl}
                alt={title}
                className="h-[220px] w-full object-cover sm:h-[280px] lg:h-[320px]"
              />
            </div>
          )}
        </motion.section>

        {/* contenu */}
        <section className="space-y-20">
          {sections.map((section, index) => (
            <ObservedSection
              key={section.id ?? `${index}-${section.heading ?? "section"}`}
              section={section}
              index={index}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-12 sm:mt-16 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 sm:px-10 py-7 sm:py-9 text-white shadow-lg shadow-slate-900/30"
        >
          <div className="max-w-2xl space-y-3">
            <h3 className="text-xl sm:text-2xl font-semibold">
              Envie d’aller plus loin avec cette thématique ?
            </h3>
            <p className="text-sm sm:text-base text-slate-300">
              Contacte-moi pour transformer cette idée en projet concret :
              site, outil, SaaS ou contenu plus approfondi.
            </p>
          </div>
          <div className="mt-5">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 sm:px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Me contacter
            </Link>
          </div>
        </motion.section>
      </main>
    </div>
  );
};
