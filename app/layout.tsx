import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Systèmes & Dashboards",
  description:
    "Je connecte tes outils, j’automatise tes process et je crée des dashboards pour piloter ton entreprise simplement.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
