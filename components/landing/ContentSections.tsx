"use client";

import React from "react";
import { motion } from "motion/react";
import type { LandingSection } from "./LandingLayout";

type ContentSectionsProps = {
  sections: LandingSection[];
};

const ContentSections: React.FC<ContentSectionsProps> = ({ sections }) => {
  return (
    <section className="space-y-10 lg:space-y-12">
      {sections.map((section, idx) => (
        <motion.div
          key={section.id ?? `${section.title}-${idx}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10"
        >
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {section.title}
          </h2>

          {section.text && (
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 whitespace-pre-line">
              {section.text}
            </p>
          )}

          {section.bullets && section.bullets.length > 0 && (
            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              {section.bullets.map((item: string, i: number) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-[6px] inline-block h-[6px] w-[6px] flex-shrink-0 rounded-full bg-indigo-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      ))}
    </section>
  );
};

export default ContentSections;
