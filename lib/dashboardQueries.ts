import { getSupabaseServerClient } from "@/lib/supabaseClient";

export type DashboardFilters = {
  startDate: string;
  endDate: string;
  campaignId?: string | null;
  adsetId?: string | null;
  postId?: string | null;
};

export type DashboardOverview = {
  totalSpend: number;
  totalRevenue: number;
  totalPurchases: number;
  totalImpressions: number;
  totalClicks: number;
  videoViews3s: number;
  videoThruplays: number;
  avgCpc: number | null;
  avgCpm: number | null;
  avgCtr: number | null;
  roas: number | null;
};

export type TopPostRow = {
  post_id: string;
  post_type: string | null;
  message_preview: string | null;
  permalink: string | null;
  currency: string | null;
  spend: number;
  revenue: number;
  purchases: number;
  impressions: number;
  clicks: number;
  roas: number | null;
  ctr: number | null;
  cpc: number | null;
  cpm: number | null;
  video_thruplays: number;
  cost_per_thruplay: number | null;
  reach_total: number | null;
  reach_paid: number | null;
  reach_organic: number | null;
  impressions_total: number | null;
  impressions_paid: number | null;
  impressions_organic: number | null;
  reactions: number | null;
  comments: number | null;
  shares: number | null;
  saves: number | null;
};

export type TimeSeriesPoint = {
  bucket: string;
  spend: number;
  revenue: number;
  purchases: number;
  impressions: number;
  clicks: number;
  ctr: number | null;
  cpc: number | null;
  cpm: number | null;
  roas: number | null;
  video_views_3s: number;
  video_thruplays: number;
};

export type PostDetail = {
  post_id: string;
  post_type: string | null;
  message_preview: string | null;
  permalink: string | null;
  post_created_time: string | null;
  impressions_total: number | null;
  impressions_paid: number | null;
  impressions_organic: number | null;
  reach_total: number | null;
  reach_paid: number | null;
  reach_organic: number | null;
  clicks_all: number | null;
  clicks_link: number | null;
  reactions: number | null;
  comments: number | null;
  shares: number | null;
  saves: number | null;
  video_views_3s: number | null;
  video_thruplays: number | null;
  video_avg_watch_time: number | null;
  ad_spend: number | null;
  ad_revenue: number | null;
  ad_purchases: number | null;
  ad_impressions: number | null;
  ad_clicks: number | null;
  ad_roas: number | null;
  ad_cpc: number | null;
  ad_cpm: number | null;
  ad_ctr: number | null;
  ads: {
    ad_id: string;
    ad_name: string;
    adset_name: string;
    campaign_name: string;
    spend: number;
    revenue: number;
    impressions: number;
    clicks: number;
    roas: number | null;
  }[];
};

export type FilterOptions = {
  campaigns: { id: string; name: string }[];
  adsets: { id: string; name: string; campaignId: string | null }[];
  posts: { id: string; preview: string | null }[];
};

const EMPTY_OVERVIEW: DashboardOverview = {
  totalSpend: 0,
  totalRevenue: 0,
  totalPurchases: 0,
  totalImpressions: 0,
  totalClicks: 0,
  videoViews3s: 0,
  videoThruplays: 0,
  avgCpc: null,
  avgCpm: null,
  avgCtr: null,
  roas: null,
};

const toTextArray = (value?: string | null) => {
  if (!value) {
    return null;
  }
  return [value];
};

function buildFilterPayload(filters: DashboardFilters) {
  return {
    p_start: filters.startDate,
    p_end: filters.endDate,
    p_campaign_ids: toTextArray(filters.campaignId),
    p_adset_ids: toTextArray(filters.adsetId),
    p_post_ids: toTextArray(filters.postId),
  };
}

export async function fetchOverview(filters: DashboardFilters) {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.rpc("dashboard_overview", {
    ...buildFilterPayload(filters),
  });

  if (error) {
    throw new Error(`dashboard_overview failed: ${error.message}`);
  }

  if (!data?.length) {
    return EMPTY_OVERVIEW;
  }

  const row = data[0];
  return {
    totalSpend: Number(row.total_spend || 0),
    totalRevenue: Number(row.total_revenue || 0),
    totalPurchases: Number(row.total_purchases || 0),
    totalImpressions: Number(row.total_impressions || 0),
    totalClicks: Number(row.total_clicks || 0),
    videoViews3s: Number(row.video_views_3s || 0),
    videoThruplays: Number(row.video_thruplays || 0),
    avgCpc: row.avg_cpc ?? null,
    avgCpm: row.avg_cpm ?? null,
    avgCtr: row.avg_ctr ?? null,
    roas: row.roas ?? null,
  };
}

export async function fetchTopPosts(
  filters: DashboardFilters,
  limit = 10,
  order: "roas" | "revenue" | "spend" | "impressions" | "clicks" | "thruplays" | "cost_per_thruplay" =
    "roas",
) {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.rpc("dashboard_top_posts", {
    ...buildFilterPayload(filters),
    p_limit: limit,
    p_order: order,
  });

  if (error) {
    throw new Error(`dashboard_top_posts failed: ${error.message}`);
  }

  return (data ?? []) as TopPostRow[];
}

export async function fetchTimeSeries(filters: DashboardFilters) {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.rpc("dashboard_time_series", {
    ...buildFilterPayload(filters),
    p_granularity: "day",
  });

  if (error) {
    throw new Error(`dashboard_time_series failed: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
    ...row,
    bucket: row.bucket,
  })) as TimeSeriesPoint[];
}

export async function fetchPostDetail(filters: DashboardFilters) {
  if (!filters.postId) {
    return null;
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.rpc("dashboard_post_detail", {
    p_post_id: filters.postId,
    p_start: filters.startDate,
    p_end: filters.endDate,
  });

  if (error) {
    throw new Error(`dashboard_post_detail failed: ${error.message}`);
  }

  if (!data?.length) {
    return null;
  }

  const row = data[0] as PostDetail;
  return {
    ...row,
    ads: (row.ads ?? []) as PostDetail["ads"],
  };
}

export async function fetchFilterOptions(filters: DashboardFilters) {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.rpc("dashboard_filter_options", {
    p_start: filters.startDate,
    p_end: filters.endDate,
  });

  if (error) {
    throw new Error(`dashboard_filter_options failed: ${error.message}`);
  }

  const row = data?.[0] ?? {};
  return {
    campaigns: (row.campaigns ?? []) as FilterOptions["campaigns"],
    adsets: (row.adsets ?? []) as FilterOptions["adsets"],
    posts: (row.posts ?? []) as FilterOptions["posts"],
  };
}
