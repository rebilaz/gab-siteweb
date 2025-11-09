// src/lib/tracking.ts
"use client";

const TRACK_ENDPOINT =
  process.env.NEXT_PUBLIC_TRACK_ENDPOINT ??
  "https://<TON-PROJET>.functions.supabase.co/track-event"; // à remplacer

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1] ?? null
  );
}

// ✅ version typée propre, plus d'erreur TS
function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";

  const KEY = "sess_id";

  // on récupère ce qu'il y a en storage
  const existing = window.localStorage.getItem(KEY);

  // s'il y en a déjà un, on le renvoie direct
  if (existing && existing.length > 0) {
    return existing;
  }

  // sinon on en génère un nouveau
  const generated =
    (crypto as any)?.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  window.localStorage.setItem(KEY, generated);

  return generated;
}

function getUtmAndCampaignParams() {
  if (typeof window === "undefined") return {};
  const url = new URL(window.location.href);
  const get = (k: string) => url.searchParams.get(k) || undefined;

  return {
    utm_source: get("utm_source"),
    utm_medium: get("utm_medium"),
    utm_campaign: get("utm_campaign"),
    utm_content: get("utm_content"),
    utm_term: get("utm_term"),
    campaign_id: get("campaign_id"),
    adset_id: get("adset_id"),
    ad_id: get("ad_id"),
    fbclid: get("fbclid"),
  };
}

export type ExtraTrackingData = {
  scroll_pct?: number | null;
  source?: string; // ex: "approach_cta", "contact_quiz"
};

export async function trackEvent(
  event_name: string,
  value: number,
  extra: ExtraTrackingData = {},
) {
  if (typeof window === "undefined") return;

  try {
    const url = window.location.href;
    const referrer = document.referrer || null;
    const session_id = getOrCreateSessionId();
    const utm = getUtmAndCampaignParams();

    const body = {
      event_name,
      value,
      url,
      referrer,
      scroll_pct: extra.scroll_pct ?? null,
      session_id,
      fbc: getCookie("_fbc"),
      fbp: getCookie("_fbp"),
      ...utm,
      source: extra.source ?? undefined,
    };

    // fire & forget
    fetch(TRACK_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    }).catch(() => {});
  } catch (e) {
    console.error("trackEvent error", e);
  }
}

/**
 * À appeler une seule fois sur la page :
 * - PageView (value 1)
 * - PageView "fort" (value 3) si scroll >= 50% ou 10s sur la page
 */
let pageTrackingInit = false;
export function setupPageTracking() {
  if (pageTrackingInit || typeof window === "undefined") return;
  pageTrackingInit = true;

  // 1️⃣ PageView simple
  trackEvent("PageView", 1);

  // 2️⃣ PageView fort (scroll 50% ou 10s)
  let strongSent = false;

  const sendStrong = (scroll_pct: number | null) => {
    if (strongSent) return;
    strongSent = true;
    trackEvent("PageView", 3, { scroll_pct });
  };

  // 10 secondes
  setTimeout(() => sendStrong(null), 10_000);

  // scroll >= 50%
  window.addEventListener("scroll", () => {
    const scrollPercent =
      ((window.scrollY + window.innerHeight) / document.body.scrollHeight) *
      100;
    if (scrollPercent >= 50) {
      sendStrong(Math.round(scrollPercent));
    }
  });
}
