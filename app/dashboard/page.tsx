import FilterBar from "@/components/dashboard/filter-bar";
import KpiCard from "@/components/dashboard/kpi-card";
import PostDetailPanel from "@/components/dashboard/post-detail-panel";
import TimeSeriesChart from "@/components/dashboard/time-series-chart";
import TopPostsTable from "@/components/dashboard/top-posts-table";
import {
  fetchFilterOptions,
  fetchOverview,
  fetchPostDetail,
  fetchTimeSeries,
  fetchTopPosts,
  type DashboardFilters,
} from "@/lib/dashboardQueries";
import {
  formatCurrency,
  formatMultiple,
  formatNumber,
  formatPercentage,
} from "@/lib/formatters";

type SearchParams = Record<string, string | string[] | undefined>;

const getIsoDate = (date: Date) => date.toISOString().split("T")[0];

const getDefaultFilters = (): DashboardFilters => {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 29);
  return {
    startDate: getIsoDate(start),
    endDate: getIsoDate(end),
    campaignId: null,
    adsetId: null,
    postId: null,
  };
};

const parseFilters = (searchParams: SearchParams): DashboardFilters => {
  const defaults = getDefaultFilters();
  const start = typeof searchParams.startDate === "string" ? searchParams.startDate : defaults.startDate;
  const end = typeof searchParams.endDate === "string" ? searchParams.endDate : defaults.endDate;

  return {
    startDate: start,
    endDate: end,
    campaignId: typeof searchParams.campaignId === "string" ? searchParams.campaignId : null,
    adsetId: typeof searchParams.adsetId === "string" ? searchParams.adsetId : null,
    postId: typeof searchParams.postId === "string" ? searchParams.postId : null,
  };
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const filters = parseFilters(resolvedSearchParams);

  const [overview, topPosts, timeSeries, options, postDetail] = await Promise.all([
    fetchOverview(filters),
    fetchTopPosts(filters, 20, "roas"),
    fetchTimeSeries(filters),
    fetchFilterOptions(filters),
    fetchPostDetail(filters),
  ]);

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <div className="mx-auto max-w-7xl space-y-10 px-6 py-10">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Analytics
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Meta Ads & Facebook Posts Dashboard
          </h1>
          <p className="text-slate-500">
            Visualise spend, ROAS, engagement organique et les posts qui performent.
          </p>
        </header>

        <FilterBar initialFilters={filters} options={options} />

        <section>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <KpiCard
              label="Spend total"
              value={formatCurrency(overview.totalSpend)}
              helper="Budget Meta dépensé sur la période"
            />
            <KpiCard
              label="Revenue total"
              value={formatCurrency(overview.totalRevenue)}
              helper="Tracking conversions attribuées"
            />
            <KpiCard
              label="ROAS"
              value={formatMultiple(overview.roas)}
              helper="Revenue / Spend"
            />
            <KpiCard
              label="CPC moyen"
              value={formatCurrency(overview.avgCpc)}
              helper="Spend / Clicks"
            />
            <KpiCard
              label="CPM moyen"
              value={formatCurrency(overview.avgCpm)}
              helper="Spend / 1000 impressions"
            />
            <KpiCard
              label="CTR moyen"
              value={formatPercentage(overview.avgCtr)}
              helper="Clicks / Impressions"
            />
            <KpiCard
              label="Impressions"
              value={formatNumber(overview.totalImpressions)}
            />
            <KpiCard
              label="Clicks"
              value={formatNumber(overview.totalClicks)}
            />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <TimeSeriesChart
            title="Spend, revenue & ROAS"
            data={timeSeries}
            lines={[
              { dataKey: "spend", label: "Spend", color: "#0F172A", yAxisId: "left" },
              { dataKey: "revenue", label: "Revenue", color: "#22C55E", yAxisId: "left" },
              { dataKey: "roas", label: "ROAS", color: "#6366F1", yAxisId: "right" },
            ]}
          />
          <TimeSeriesChart
            title="Impressions, Clicks & CTR"
            data={timeSeries}
            lines={[
              { dataKey: "impressions", label: "Impressions", color: "#0EA5E9", yAxisId: "left" },
              { dataKey: "clicks", label: "Clicks", color: "#F97316", yAxisId: "left" },
              { dataKey: "ctr", label: "CTR", color: "#22D3EE", yAxisId: "right" },
            ]}
          />
          <div className="lg:col-span-2">
            <TimeSeriesChart
              title="Vues vidéo"
              data={timeSeries}
              lines={[
                { dataKey: "video_views_3s", label: "Vues 3s", color: "#A855F7", yAxisId: "left" },
                { dataKey: "video_thruplays", label: "Thruplays", color: "#EF4444", yAxisId: "left" },
              ]}
            />
          </div>
        </section>

        <TopPostsTable posts={topPosts} highlightedPostId={filters.postId} />

        <PostDetailPanel selectedPostId={filters.postId} detail={postDetail} />
      </div>
    </div>
  );
}
