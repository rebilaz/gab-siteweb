"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { TopPostRow } from "@/lib/dashboardQueries";
import {
  formatCurrency,
  formatMultiple,
  formatNumber,
} from "@/lib/formatters";

type Props = {
  posts: TopPostRow[];
  highlightedPostId?: string | null;
};

type SortableKey =
  | "roas"
  | "revenue"
  | "spend"
  | "impressions"
  | "clicks"
  | "video_thruplays"
  | "cost_per_thruplay";

const columns: { key: SortableKey | "post"; label: string }[] = [
  { key: "post", label: "Post" },
  { key: "spend", label: "Spend" },
  { key: "revenue", label: "Revenue" },
  { key: "roas", label: "ROAS" },
  { key: "impressions", label: "Impr." },
  { key: "clicks", label: "Clicks" },
  { key: "video_thruplays", label: "Thruplays" },
  { key: "cost_per_thruplay", label: "€ / Thruplay" },
];

export default function TopPostsTable({ posts, highlightedPostId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [sortKey, setSortKey] = useState<SortableKey>("roas");
  const [direction, setDirection] = useState<"asc" | "desc">("desc");

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      const aValue = Number(a[sortKey] ?? 0);
      const bValue = Number(b[sortKey] ?? 0);
      if (direction === "desc") {
        return bValue - aValue;
      }
      return aValue - bValue;
    });
  }, [posts, sortKey, direction]);

  const toggleSort = (key: SortableKey) => {
    if (sortKey === key) {
      setDirection((prev) => (prev === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setDirection("desc");
    }
  };

  const navigateToPost = (postId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("postId", postId);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <div>
          <p className="text-base font-semibold text-slate-900">Top posts</p>
          <p className="text-sm text-slate-500">
            Classement dynamique selon la métrique sélectionnée.
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3"
                  onClick={
                    column.key === "post"
                      ? undefined
                      : () => toggleSort(column.key as SortableKey)
                  }
                >
                  <button
                    type="button"
                    className="flex items-center gap-2"
                    disabled={column.key === "post"}
                  >
                    {column.label}
                    {column.key !== "post" && sortKey === column.key ? (
                      <span>{direction === "desc" ? "↓" : "↑"}</span>
                    ) : null}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedPosts.map((post) => (
              <tr
                key={post.post_id}
                className={`cursor-pointer transition hover:bg-slate-50 ${
                  highlightedPostId === post.post_id ? "bg-slate-50" : ""
                }`}
                onClick={() => navigateToPost(post.post_id)}
              >
                <td className="px-4 py-3">
                  <div className="max-w-xs">
                    <p className="text-sm font-medium text-slate-900">
                      {post.message_preview ?? "Sans message"}
                    </p>
                    <p className="text-xs text-slate-500">{post.post_id}</p>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {formatCurrency(post.spend)}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {formatCurrency(post.revenue)}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {formatMultiple(post.roas)}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {formatNumber(post.impressions)}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {formatNumber(post.clicks)}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {formatNumber(post.video_thruplays)}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {post.cost_per_thruplay !== null && post.cost_per_thruplay !== undefined
                    ? formatCurrency(post.cost_per_thruplay)
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
