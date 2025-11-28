import type { NextPage } from "next";

import { PrimaryCTA } from "../../components/PrimaryCTA";

const CoachsPage: NextPage = () => {
  return (
    <div className="space-y-12">
      <section className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            SaaS pour programmes
          </p>
          <h1 className="text-3xl font-bold text-gray-900">
            Je construis ton outil SaaS à intégrer dans tes programmes.
          </h1>
          <p className="text-lg text-gray-700">
            Ajoute un vrai logiciel à ton offre de coaching ou de formation, et
            augmente instantanément ta valeur perçue.
          </p>
          <PrimaryCTA label="Discuter de mon programme" niche="coachs" />
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Ton programme ressemble à tous les autres
        </h2>
        <p className="text-gray-700">
          Tous les programmes vendent :
        </p>
        <ul className="list-disc space-y-2 pl-5 text-gray-700">
          <li>des vidéos</li>
          <li>des templates</li>
          <li>des calls de groupe</li>
        </ul>
        <p className="text-gray-700">
          Tu peux te différencier en ajoutant un outil que seul ton programme
          propose.
        </p>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Un outil aligné avec ta méthode
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-gray-700">
          <li>portails pour tes élèves</li>
          <li>trackers de progression</li>
          <li>générateurs de plans personnalisés</li>
          <li>outils IA qui appliquent ta méthode</li>
          <li>dashboards de suivi</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Passe de « coach » à « créateur d’outil »
        </h2>
        <p className="text-gray-700">
          Un outil :
        </p>
        <ul className="list-disc space-y-2 pl-5 text-gray-700">
          <li>augmente le prix que tu peux demander</li>
          <li>améliore les résultats de tes clients</li>
          <li>réduit les questions répétitives</li>
          <li>crée un vrai moat autour de ton programme</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          On regarde ce qu’on peut productiser dans ton programme ?
        </h2>
        <p className="text-gray-700">
          Tu m’expliques ta méthode, je t’aide à en extraire un outil concret.
        </p>
        <PrimaryCTA label="Réserver un appel" niche="coachs" />
      </section>
    </div>
  );
};

export default CoachsPage;

