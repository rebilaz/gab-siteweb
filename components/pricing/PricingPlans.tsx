import Link from "next/link";
import type { PricingPlan } from "./PricingClient";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-emerald-300">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatPrice(p: string) {
  if (p === "Sur devis") return p;
  return p;
}

export function PricingPlans({ plans }: { plans: PricingPlan[] }) {
  return (
    <section className="mx-auto mt-10">
      <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
        {plans.map((plan) => {
          const featured = Boolean(plan.featured);
          const mainFeatures = plan.features.slice(0, 3);

          return (
            <div
              key={plan.name}
              className={cx(
                // More contrast: darker card, clearer border, less blur
                "relative overflow-hidden rounded-3xl border p-6",
                "bg-[#070E22] border-white/14",
                "shadow-[0_20px_80px_rgba(0,0,0,0.55)]",
                featured && "border-indigo-400/35 bg-[#07102A]",
              )}
            >
              {/* subtle highlight only for featured */}
              {featured && (
                <>
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-24 left-1/2 h-48 w-64 -translate-x-1/2 rounded-full bg-indigo-500/25 blur-3xl" />
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-indigo-400/30" />
                </>
              )}

              <div className="relative flex h-full flex-col">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-base font-semibold text-white">
                      {plan.name}
                    </h2>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                      {plan.highlight}
                    </p>
                  </div>

                  <span
                    className={cx(
                      "rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]",
                      featured
                        ? "bg-indigo-500/18 text-indigo-100 ring-1 ring-indigo-300/25"
                        : "bg-white/6 text-white/70 ring-1 ring-white/10",
                    )}
                  >
                    {plan.badge}
                  </span>
                </div>

                {/* Price */}
                <div className="mt-7 flex items-end gap-2">
                  <div className={cx(
                    "text-4xl font-black tracking-tight",
                    plan.price === "Sur devis" ? "text-white" : "text-white"
                  )}>
                    {formatPrice(plan.price)}
                  </div>

                  {plan.price !== "Sur devis" && (
                    <div className="pb-1 text-xs text-white/55">
                      / projet
                    </div>
                  )}
                </div>

                {/* Minimal description: 1 line max */}
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {plan.name === "Starter"
                    ? "Pour sortir un produit vite, propre, vendable."
                    : plan.name === "Growth"
                      ? "Pour un SaaS sérieux avec pages + abonnements."
                      : "Pour un produit sur mesure, scalable, intégrations incluses."}
                </p>

                {/* CTA */}
                <div className="mt-6">
                  {plan.ctaHref ? (
                    <Link
                      href={plan.ctaHref}
                      className={cx(
                        "inline-flex h-11 w-full items-center justify-center rounded-2xl px-4 text-sm font-semibold transition",
                        "border border-white/18 bg-white/6 text-white hover:bg-white/10",
                      )}
                    >
                      {plan.ctaLabel}
                    </Link>
                  ) : (
                    <button
                      className={cx(
                        "inline-flex h-11 w-full items-center justify-center rounded-2xl px-4 text-sm font-semibold transition active:scale-[0.99]",
                        featured
                          ? "bg-indigo-500 text-white hover:bg-indigo-400"
                          : "bg-white text-[#050B1A] hover:bg-white/90",
                      )}
                    >
                      {plan.ctaLabel}
                    </button>
                  )}
                </div>

                {/* Features (minimal) */}
                <div className="mt-6 rounded-2xl border border-white/12 bg-black/20 p-4">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                    Inclus
                  </p>

                  <ul className="space-y-2 text-sm text-white/80">
                    {mainFeatures.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="mt-[5px] inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/10 ring-1 ring-emerald-300/20">
                          <CheckIcon />
                        </span>
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Optional: keep minimal expand link */}
                  {plan.features.length > 3 && (
                    <div className="mt-4">
                      <Link
                        href="/contact"
                        className="text-[11px] font-semibold text-white/70 underline decoration-white/15 underline-offset-4 hover:text-white"
                      >
                        Voir le détail
                      </Link>
                    </div>
                  )}
                </div>

                {/* Push card content to top; keep consistent height */}
                <div className="mt-auto" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
