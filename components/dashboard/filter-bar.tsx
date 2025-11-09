"use client";

import { useRouter, usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import type {
  DashboardFilters,
  FilterOptions,
} from "@/lib/dashboardQueries";

type Props = {
  initialFilters: DashboardFilters;
  options: FilterOptions;
};

export default function FilterBar({ initialFilters, options }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [localFilters, setLocalFilters] = useState<DashboardFilters>({
    ...initialFilters,
  });

  const filteredAdsets = useMemo(() => {
    if (!localFilters.campaignId) {
      return options.adsets;
    }
    return options.adsets.filter(
      (adset) => adset.campaignId === localFilters.campaignId,
    );
  }, [localFilters.campaignId, options.adsets]);

  const updateField = (key: keyof DashboardFilters, value: string) => {
    const formattedValue =
      key === "startDate" || key === "endDate" ? value : value || null;
    setLocalFilters((prev) => ({
      ...prev,
      [key]: formattedValue,
    }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    params.set("startDate", localFilters.startDate);
    params.set("endDate", localFilters.endDate);
    if (localFilters.campaignId) params.set("campaignId", localFilters.campaignId);
    if (localFilters.adsetId) params.set("adsetId", localFilters.adsetId);
    if (localFilters.postId) params.set("postId", localFilters.postId);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    setLocalFilters({ ...initialFilters, campaignId: null, adsetId: null, postId: null });
    router.push(
      `${pathname}?startDate=${initialFilters.startDate}&endDate=${initialFilters.endDate}`,
      { scroll: false },
    );
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-1 min-w-[160px] flex-col">
          <label className="text-xs font-medium text-slate-500">Date début</label>
          <input
            type="date"
            value={localFilters.startDate}
            onChange={(event) => updateField("startDate", event.target.value)}
            className="mt-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div className="flex flex-1 min-w-[160px] flex-col">
          <label className="text-xs font-medium text-slate-500">Date fin</label>
          <input
            type="date"
            value={localFilters.endDate}
            onChange={(event) => updateField("endDate", event.target.value)}
            className="mt-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div className="flex flex-1 min-w-[160px] flex-col">
          <label className="text-xs font-medium text-slate-500">Campagne</label>
          <select
            value={localFilters.campaignId ?? ""}
            onChange={(event) => updateField("campaignId", event.target.value)}
            className="mt-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="">Toutes</option>
            {options.campaigns.map((campaign) => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-1 min-w-[160px] flex-col">
          <label className="text-xs font-medium text-slate-500">Adset</label>
          <select
            value={localFilters.adsetId ?? ""}
            onChange={(event) => updateField("adsetId", event.target.value)}
            className="mt-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="">Tous</option>
            {filteredAdsets.map((adset) => (
              <option key={adset.id} value={adset.id}>
                {adset.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-1 min-w-[200px] flex-col">
          <label className="text-xs font-medium text-slate-500">Post</label>
          <select
            value={localFilters.postId ?? ""}
            onChange={(event) => updateField("postId", event.target.value)}
            className="mt-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="">Tous</option>
            {options.posts.map((post) => (
              <option key={post.id} value={post.id}>
                {post.preview ?? post.id}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={resetFilters}
          className="text-sm font-medium text-slate-500 underline-offset-4 hover:underline"
        >
          Réinitialiser
        </button>
        <button
          type="button"
          onClick={applyFilters}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Appliquer les filtres
        </button>
      </div>
    </div>
  );
}
