import type { PostDetail } from "@/lib/dashboardQueries";
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
} from "@/lib/formatters";

type Props = {
  selectedPostId?: string | null;
  detail: PostDetail | null;
};

export default function PostDetailPanel({ selectedPostId, detail }: Props) {
  if (!selectedPostId) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center">
        <p className="text-base font-semibold text-slate-900">
          Sélectionne un post pour voir le détail
        </p>
        <p className="text-sm text-slate-500">
          Clique sur un post dans la table ou utilise le filtre ci-dessus.
        </p>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-base font-semibold text-slate-900">
          Aucun détail disponible
        </p>
        <p className="text-sm text-slate-500">
          Vérifie que des données existent pour ce post et la période choisie.
        </p>
      </div>
    );
  }

  const infoRows = [
    { label: "Impressions organiques", value: formatNumber(detail.impressions_organic) },
    { label: "Impressions payées", value: formatNumber(detail.impressions_paid) },
    { label: "Reach organique", value: formatNumber(detail.reach_organic) },
    { label: "Reach payé", value: formatNumber(detail.reach_paid) },
    { label: "Reactions", value: formatNumber(detail.reactions) },
    { label: "Commentaires", value: formatNumber(detail.comments) },
    { label: "Partages", value: formatNumber(detail.shares) },
    { label: "Enregistrements", value: formatNumber(detail.saves) },
    { label: "Vues 3s", value: formatNumber(detail.video_views_3s) },
    { label: "Thruplays organiques", value: formatNumber(detail.video_thruplays) },
  ];

  const adStats = [
    { label: "Spend", value: formatCurrency(detail.ad_spend ?? 0) },
    { label: "Revenue", value: formatCurrency(detail.ad_revenue ?? 0) },
    { label: "Achats", value: formatNumber(detail.ad_purchases) },
    { label: "Impressions", value: formatNumber(detail.ad_impressions) },
    { label: "Clicks", value: formatNumber(detail.ad_clicks) },
    { label: "ROAS", value: formatPercentage(detail.ad_roas) },
    { label: "CPC", value: formatCurrency(detail.ad_cpc ?? 0) },
    { label: "CPM", value: formatCurrency(detail.ad_cpm ?? 0) },
    { label: "CTR", value: formatPercentage(detail.ad_ctr) },
  ];

  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Fiche post
        </p>
        <p className="mt-2 text-xl font-semibold text-slate-900">
          {detail.message_preview ?? detail.post_id}
        </p>
        <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-500">
          {detail.post_type ? (
            <span className="rounded-full border border-slate-200 px-2 py-0.5">
              {detail.post_type}
            </span>
          ) : null}
          <a
            href={detail.permalink ?? "#"}
            className="text-slate-600 underline-offset-4 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Voir sur Facebook
          </a>
        </div>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-slate-600">
            Portée & Engagement organique
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
            {infoRows.map((row) => (
              <div key={row.label}>
                <dt className="text-slate-500">{row.label}</dt>
                <dd className="font-semibold text-slate-900">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-600">
            Performance Ads (agrégée)
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
            {adStats.map((row) => (
              <div key={row.label}>
                <dt className="text-slate-500">{row.label}</dt>
                <dd className="font-semibold text-slate-900">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {detail.ads?.length ? (
        <div className="border-t border-slate-100 px-6 py-4">
          <p className="text-sm font-semibold text-slate-600">
            Campagnes & ads associés
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-3 py-2">Ad</th>
                  <th className="px-3 py-2">Campagne / Adset</th>
                  <th className="px-3 py-2 text-right">Spend</th>
                  <th className="px-3 py-2 text-right">Revenue</th>
                  <th className="px-3 py-2 text-right">ROAS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {detail.ads.map((ad) => (
                  <tr key={ad.ad_id}>
                    <td className="px-3 py-2">
                      <div className="font-medium text-slate-900">
                        {ad.ad_name}
                      </div>
                      <div className="text-xs text-slate-500">{ad.ad_id}</div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="text-sm text-slate-900">
                        {ad.campaign_name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {ad.adset_name}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-right">
                      {formatCurrency(ad.spend)}
                    </td>
                    <td className="px-3 py-2 text-right">
                      {formatCurrency(ad.revenue)}
                    </td>
                    <td className="px-3 py-2 text-right">
                      {formatPercentage(ad.roas)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
}
