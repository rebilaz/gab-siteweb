import type { NextPage } from "next";

import { PrimaryCTA } from "../../components/PrimaryCTA";

const FreelancersPage: NextPage = () => {
  return (
    <div className="space-y-12">
      <section className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            De service à produit
          </p>
          <h1 className="text-3xl font-bold text-gray-900">
            Transforme ton service freelance en SaaS automatisé.
          </h1>
          <p className="text-lg text-gray-700">
            Au lieu de vendre ton temps, transforme ce que tu fais déjà pour tes
            clients en outil en ligne.
          </p>
          <PrimaryCTA label="Transformer mon service en SaaS" niche="freelancers" />
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Tu vends ton temps, pas ton système
        </h2>
        <p className="text-gray-700">
          Tu as déjà un process qui fonctionne pour tes clients. Mais tu atteins
          un plafond : pas assez de temps, pas assez de bande passante. Un SaaS
          te permet de transformer ce process en produit qui se vend même quand
          tu dors.
        </p>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          On part de ce que tu fais déjà
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-gray-700">
          <li>génération de rapports ou audits</li>
          <li>checklists ou frameworks</li>
          <li>outils de calcul / estimation</li>
          <li>tableaux de suivi clients</li>
          <li>mini-outils IA que tu utilises pour eux</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          De freelance à fondateur de SaaS
        </h2>
        <p className="text-gray-700">
          On garde ton expertise, on la met dans un SaaS :
        </p>
        <ul className="list-disc space-y-2 pl-5 text-gray-700">
          <li>tes clients accèdent à une plateforme</li>
          <li>tu peux facturer un abonnement</li>
          <li>tu n’es plus limité par ton temps disponible</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          On regarde si ton service est « SaaSifiable » ?
        </h2>
        <p className="text-gray-700">
          Tu me présentes ton service actuel, je te dis si on peut en faire un
          SaaS rentable.
        </p>
        <PrimaryCTA label="Parler de mon service" niche="freelancers" />
      </section>
    </div>
  );
};

export default FreelancersPage;

