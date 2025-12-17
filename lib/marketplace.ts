import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DATA_DIR = path.join(process.cwd(), "content/marketplace");

/* =========================
   TYPES
========================= */

export type TrafficPoint = {
  label: string;
  value: number;
};

export type VexlyAnalysis = {
  estimated_price?: string;
  comment?: string;
};

export type Listing = {
  slug: string;

  // Header
  name: string;
  tagline?: string;
  niche_category?: string;
  discovered_at?: string;

  // URLs
  url?: string;
  demo_url?: string;

  // SEO / SaaS proof (optionnel)
  pricing_url?: string;
  login_url?: string;
  proof_of_saas?: string;

  // Media
  image?: string;

  // Content
  content: string;
  mvp_features?: string[];

  // Tech
  stack_guess?: string[];

  // Traction
  monthly_visits?: TrafficPoint[];
  growth_rate?: number;

  // Expert analysis
  vexly_analysis?: VexlyAnalysis;
};

/* =========================
   SMALL GUARDS
========================= */

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === "string");
}

function isTrafficPointArray(v: unknown): v is TrafficPoint[] {
  return (
    Array.isArray(v) &&
    v.every(
      (x) =>
        x &&
        typeof x === "object" &&
        typeof (x as any).label === "string" &&
        typeof (x as any).value === "number"
    )
  );
}

/* =========================
   HELPERS
========================= */

export function getAllListingSlugs(): { slug: string }[] {
  if (!fs.existsSync(DATA_DIR)) return [];

  return fs
    .readdirSync(DATA_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      slug: file.replace(/\.md$/, ""),
    }));
}

export function getListing(slug: string): Listing | null {
  const fullPath = path.join(DATA_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const listing: Listing = {
    slug,

    name: typeof data?.name === "string" ? data.name : slug,
    tagline: typeof data?.tagline === "string" ? data.tagline : undefined,

    niche_category: typeof data?.niche_category === "string" ? data.niche_category : undefined,
    discovered_at: typeof data?.discovered_at === "string" ? data.discovered_at : undefined,

    url: typeof data?.url === "string" ? data.url : undefined,
    demo_url: typeof data?.demo_url === "string" ? data.demo_url : undefined,

    pricing_url: typeof data?.pricing_url === "string" ? data.pricing_url : undefined,
    login_url: typeof data?.login_url === "string" ? data.login_url : undefined,
    proof_of_saas: typeof data?.proof_of_saas === "string" ? data.proof_of_saas : undefined,

    image: typeof data?.image === "string" ? data.image : undefined,

    content: (content ?? "").trim(),

    mvp_features: isStringArray(data?.mvp_features) ? data.mvp_features : undefined,
    stack_guess: isStringArray(data?.stack_guess) ? data.stack_guess : undefined,

    monthly_visits: isTrafficPointArray(data?.monthly_visits) ? data.monthly_visits : undefined,
    growth_rate: typeof data?.growth_rate === "number" ? data.growth_rate : undefined,

    vexly_analysis: data?.vexly_analysis
      ? {
          estimated_price:
            typeof data.vexly_analysis?.estimated_price === "string"
              ? data.vexly_analysis.estimated_price
              : undefined,
          comment:
            typeof data.vexly_analysis?.comment === "string" ? data.vexly_analysis.comment : undefined,
        }
      : undefined,
  };

  return listing;
}

/**
 * ✅ Utile pour “Produits similaires”, “Alternatives”, etc.
 */
export function getAllListings(): Listing[] {
  const slugs = getAllListingSlugs();
  return slugs
    .map(({ slug }) => getListing(slug))
    .filter(Boolean) as Listing[];
}
