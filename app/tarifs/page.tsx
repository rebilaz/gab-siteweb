import type { Metadata } from "next";
import PricingClient from "@/components/pricing/PricingClient";

export const metadata: Metadata = {
  title: "Tarifs – Vexly",
  description: "Tarifs pour lancer ton SaaS clé en main : Starter, Growth ou Custom.",
  alternates: { canonical: "https://www.vexly.fr/tarifs" },
};

export default function PricingPage() {
  return <PricingClient />;
}
