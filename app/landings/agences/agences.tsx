import type { NextPage } from "next";

import { PrimaryCTA } from "../../components/PrimaryCTA";

const AgencesPage: NextPage = () => {
  return (
    <div className="space-y-12">
      <section className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            SaaS IA pour agences
          </p>
          <h1 className="text-3xl font-bold text-gray-900">
            Je construis des SaaS IA pour les agences qui veulent scaler leurs
            offres.
          </h1>
          <p className="text-lg text-gray-700">
            Donnez à vos clients un outil unique, augmentez votre LTV et
            différenciez-vous de toutes les autres agences.
          </p>
          <PrimaryCTA
            label="Discuter d’un SaaS pour mon agence"
            niche="agences"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Toutes les agences vendent la même chose
        </h2>
        <p className="text-gray-700">
          Campagnes, landing pages, emails… tout le monde propose la même
          offre. Les agences qui dominent ont un SaaS, un outil propre à elles,
          qui fidélise les clients et justifie des retainer plus élevés.
        </p>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Votre propre SaaS, white-label et orienté résultats
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-gray-700">
          <li>Outils IA pour vos clients (reporting, content, ads…)</li>
          <li>Plateforme white-label avec votre branding</li>
          <li>Dashboards de performance pour vos clients</li>
          <li>Automatisations (rapports, leads, tracking)</li>
          <li>Gestion d’accès client (multi-tenant)</li>
          <li>Intégration à vos outils (Meta, Google Ads, CRM…)</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Passez d’agence de service à agence-produit
        </h2>
        <p className="text-gray-700">
          Un SaaS à votre nom :
        </p>
        <ul className="list-disc space-y-2 pl-5 text-gray-700">
          <li>augmente la valeur perçue</li>
          <li>réduit le churn</li>
          <li>rend vos offres plus difficiles à comparer</li>
          <li>ouvre la porte à des offres plus chères</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Explorons le SaaS de votre agence
        </h2>
        <p className="text-gray-700">
          Si vous avez déjà des clients et une offre claire, on peut
          transformer ça en produit.
        </p>
        <PrimaryCTA label="Planifier un call" niche="agences" />
      </section>
    </div>
  );
};

export default AgencesPage;

