import type { Metadata } from "next";
import ParcoursClient from "@/components/ressources/parcours/ParcoursClient";

export const metadata: Metadata = {
  title: "Parcours – Vexly",
  description:
    "Parcours guidés pour apprendre à lancer, valider et développer un business SaaS étape par étape.",
  alternates: {
  canonical: "/parcours",
  },
};

export default function ParcoursPage() {
  return <ParcoursClient />;
}
