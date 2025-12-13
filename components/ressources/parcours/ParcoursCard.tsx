import Link from "next/link";

type Props = {
  slug: string;
  level: string;
  duration: string;
  title: string;
  description: string;
  steps: string;
};

export function ParcoursCard({
  slug,
  level,
  duration,
  title,
  description,
  steps,
}: Props) {
  return (
    <Link
      href={`/parcours/${slug}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-indigo-600">
          {level}
        </span>
        <span className="text-xs text-slate-500">{duration}</span>
      </div>

      <h2 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-indigo-600">
        {title}
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {description}
      </p>

      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="text-slate-500">{steps}</span>
        <span className="font-medium text-indigo-600">
          Voir le parcours →
        </span>
      </div>
    </Link>
  );
}
