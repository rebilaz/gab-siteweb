// app/parcours/[slug]/page.tsx
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

const VALID_SLUGS = new Set([
  "valider-une-idee",
  "trouver-une-idee-rentable",
  "construire-un-mvp",
]);

export default function Page({ params }: Props) {
  const slug = params.slug;

  if (!VALID_SLUGS.has(slug)) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Parcours</h1>
      <p className="mt-3 text-slate-600">
        Slug: <span className="font-mono text-slate-900">{slug}</span>
      </p>
    </main>
  );
}

// (optionnel) permet à Next de pré-générer ces pages
export function generateStaticParams() {
  return Array.from(VALID_SLUGS).map((slug) => ({ slug }));
}
