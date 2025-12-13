import Link from "next/link";

export function PricingHero() {
  return (
    <header className="mx-auto mb-14 max-w-3xl text-center">
      <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl md:text-6xl">
        Tarifs
        <br />
        <span className="text-white/70">pour lancer ton SaaS</span>
      </h1>

      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
        Un accompagnement clair. Du code propre.  
        Tu choisis le niveau, on construit le produit.
      </p>

      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/contact"
          className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-[#050B1A] transition hover:bg-white/90"
        >
          Démarrer un projet
        </Link>

        <Link
          href="/articles"
          className="inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium text-white/70 transition hover:text-white"
        >
          Voir des exemples
        </Link>
      </div>
    </header>
  );
}
