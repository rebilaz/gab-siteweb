import type { NextPage } from "next";

import { PrimaryCTA } from "../../components/PrimaryCTA";

const CreateursPage: NextPage = () => {
  return (
    <div className="space-y-12">
      <section className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Outils IA sur-mesure
          </p>
          <h1 className="text-3xl font-bold text-gray-900">
            Je construis tes outils IA sur-mesure pour YouTube et TikTok.
          </h1>
          <p className="text-lg text-gray-700">
            Tu veux ton propre outil de scripts, de repurposing ou d’analytics ?
            Je le développe pour ton workflow.
          </p>
          <PrimaryCTA label="Parler de mon idée d’outil" niche="createurs" />
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Tu utilises 10 outils, aucun n’est fait pour toi
        </h2>
        <p className="text-gray-700">
          Tu passes trop de temps à jongler entre des apps qui ne comprennent
          pas ton contenu, ton style ni ton format. Un outil sur-mesure peut
          automatiser une grosse partie de ton workflow.
        </p>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Quelques exemples de ce que je peux construire
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-gray-700">
          <li>Générateur de scripts adapté à ton ton de voix</li>
          <li>Outil de découpe automatique de vidéos longues en shorts</li>
          <li>Dashboard d’analytics centré sur ton watchtime</li>
          <li>Outil pour préparer les descriptions, titres et miniatures</li>
          <li>Portail d’accès pour ton équipe (monteur, CM, etc.)</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Gagne du temps, garde le contrôle
        </h2>
        <p className="text-gray-700">
          Tu gardes ta créativité, mais tu délègues :
        </p>
        <ul className="list-disc space-y-2 pl-5 text-gray-700">
          <li>les tâches répétitives</li>
          <li>la préparation des scripts</li>
          <li>la préparation des formats</li>
          <li>une partie de l’analyse</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Tu as une idée d’outil pour ton contenu ?
        </h2>
        <p className="text-gray-700">
          On regarde ensemble si on peut en faire un vrai outil SaaS qui te sert
          au quotidien.
        </p>
        <PrimaryCTA label="M’envoyer mon idée" niche="createurs" />
      </section>
    </div>
  );
};

export default CreateursPage;

