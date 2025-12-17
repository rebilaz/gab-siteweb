import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import { getListing, getAllListingSlugs, getAllListings } from "@/lib/marketplace";

import { Image as SaaSImage } from "@/components/marketplace/product page/Images";
import { ListingHeader } from "@/components/marketplace/product page/ListingHeader";
import { TrafficChart } from "@/components/marketplace/product page/TrafficChart";
import { CheckoutCard } from "@/components/marketplace/product page/CheckoutCard";
import { TechStack } from "@/components/marketplace/product page/TechStack";

export async function generateStaticParams() {
  const listings = getAllListingSlugs();
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) return;

  const siteName = "Vexly Marketplace";
  const title = `${listing.name}${listing.tagline ? ` — ${listing.tagline}` : ""} | ${siteName}`;

  const description =
    (listing.tagline?.trim() && listing.tagline.trim()) ||
    (listing.content?.trim().slice(0, 160) ?? `${listing.name} sur ${siteName}`);

  // ⚠️ Mets ton vrai domaine
  const canonical = `https://www.vexly.fr/marketplace/${listing.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: listing.image ? [{ url: listing.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: listing.image ? [listing.image] : [],
    },
  };
}

function pickSimilar(listingSlug: string, niche?: string) {
  // NOTE: ça marche seulement si tu ajoutes getAllListings() dans lib/marketplace.ts
  const all = typeof getAllListings === "function" ? getAllListings() : [];
  const others = all.filter((x) => x.slug !== listingSlug);

  const sameNiche = niche
    ? others.filter((x) => (x.niche_category || "").toLowerCase() === niche.toLowerCase())
    : [];

  const sortedByDate = [...others].sort((a, b) => {
    const da = a.discovered_at ? new Date(a.discovered_at).getTime() : 0;
    const db = b.discovered_at ? new Date(b.discovered_at).getTime() : 0;
    return db - da;
  });

  const pool = sameNiche.length > 0 ? sameNiche : sortedByDate;
  return pool.slice(0, 6);
}

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listing = getListing(slug);

  if (!listing) return notFound();

  // ⚠️ Mets ton vrai domaine
  const canonical = `https://www.vexly.fr/marketplace/${listing.slug}`;

  // JSON-LD (sans toucher à tes composants)
  const jsonLdProduct = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: listing.name,
    description: listing.tagline || listing.content?.slice(0, 200) || "",
    url: listing.url || canonical,
    applicationCategory: listing.niche_category || "BusinessApplication",
    operatingSystem: "Web",
    image: listing.image ? [listing.image] : undefined,
  };

  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Marketplace", item: "https://www.vexly.fr/marketplace" },
      { "@type": "ListItem", position: 2, name: listing.name, item: canonical },
    ],
  };

  const similar = pickSimilar(listing.slug, listing.niche_category);

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-24 font-sans text-slate-900">
      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
      />

      {/* Top sticky nav */}
      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/marketplace"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-900"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition-colors group-hover:bg-slate-200">
              <ArrowLeft size={16} />
            </div>
            <span>Retour au catalogue</span>
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-700">Disponible au développement</span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left */}
          <div className="space-y-8 lg:col-span-8">
            {/* ✅ Image AU-DESSUS */}
            <SaaSImage image={listing.image} name={listing.name} />

            {/* ✅ Header */}
            <ListingHeader listing={listing} />

            {/* ✅ Chart */}
            <TrafficChart data={listing.monthly_visits} growth={listing.growth_rate} />

            {/* Concept */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-900">Le Concept en détail</h2>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
                {listing.content}
              </p>
            </section>

            {/* MVP Features */}
            {Array.isArray(listing.mvp_features) && listing.mvp_features.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-extrabold text-slate-900">Fonctionnalités Clés du MVP</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {listing.mvp_features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500" />
                      <span className="text-sm font-medium text-slate-700">{feat}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tech Stack */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <TechStack stack={listing.stack_guess} />
            </section>

            {/* ✅ Maillage interne (cards en bas) */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-900">Explorer</h2>
              <p className="mt-2 text-sm text-slate-600">
                Pages satellites = maillage + SEO, tout en gardant une page luxe.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Link
                  href={`/marketplace/${listing.slug}/alternatives`}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-white hover:shadow-sm"
                >
                  <div className="text-sm font-bold text-slate-900">
                    Alternatives à {listing.name}
                  </div>
                  <div className="mt-2 text-xs leading-relaxed text-slate-600">
                    Concurrents, outils proches, options plus simples.
                  </div>
                </Link>

                <Link
                  href={`/marketplace/${listing.slug}/use-cases`}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-white hover:shadow-sm"
                >
                  <div className="text-sm font-bold text-slate-900">Cas d’usage</div>
                  <div className="mt-2 text-xs leading-relaxed text-slate-600">
                    Scénarios concrets, workflows, personas.
                  </div>
                </Link>
              </div>
            </section>

            {/* ✅ Produits similaires (si getAllListings existe) */}
            {similar.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-extrabold text-slate-900">Produits similaires</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {similar.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/marketplace/${p.slug}`}
                      className="rounded-xl border border-slate-100 bg-white p-4 transition hover:shadow-sm"
                    >
                      <div className="text-sm font-bold text-slate-900">{p.name}</div>
                      <div className="mt-1 text-xs text-slate-600 line-clamp-2">
                        {p.tagline || p.content.slice(0, 120)}
                      </div>
                      <div className="mt-2 text-[11px] font-semibold text-slate-500">
                        {p.niche_category || "—"}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right sticky column */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 flex flex-col gap-6">
              <CheckoutCard listing={listing} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
