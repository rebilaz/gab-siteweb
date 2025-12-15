"use client";

import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  LayoutGrid,
  FolderKanban,
  Eye,
  BarChart3,
  CreditCard,
  Settings,
  Plus,
  ChevronDown,
  Building2,
  DollarSign,
  TrendingUp,
  ExternalLink,
  MoreVertical,
} from "lucide-react";

type MetricTab = "MRR" | "Users" | "Validation Score";

type Project = {
  id: string;
  name: string;
  status: "draft" | "preview" | "live";
  lastUpdate: string;
  mrr: string;
};

const projects: Project[] = [
  { id: "1", name: "LinkFlow - URL Shortener", status: "live", lastUpdate: "2 hours ago", mrr: "$2,400" },
  { id: "2", name: "TaskMaster Pro", status: "preview", lastUpdate: "1 day ago", mrr: "$0" },
  { id: "3", name: "EmailBoost", status: "live", lastUpdate: "3 days ago", mrr: "$5,200" },
  { id: "4", name: "DataViz Studio", status: "draft", lastUpdate: "1 week ago", mrr: "$0" },
];

const statusConfig = {
  draft: { label: "Draft", color: "bg-slate-100 text-slate-700" },
  preview: { label: "Preview", color: "bg-amber-100 text-amber-700" },
  live: { label: "Live", color: "bg-emerald-100 text-emerald-700" },
};

function classNames(...s: Array<string | false | undefined | null>) {
  return s.filter(Boolean).join(" ");
}

/** Simple SVG line chart (no library) */
function LineChart({
  points,
  height = 260,
}: {
  points: number[];
  height?: number;
}) {
  const width = 940;
  const padding = { top: 20, right: 28, bottom: 30, left: 44 };

  const min = 0;
  const max = 100;

  const xStep =
    points.length <= 1
      ? 0
      : (width - padding.left - padding.right) / (points.length - 1);

  const y = (v: number) => {
    const h = height - padding.top - padding.bottom;
    const t = (v - min) / (max - min || 1);
    return padding.top + (1 - t) * h;
  };

  const x = (i: number) => padding.left + i * xStep;

  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(p)}`)
    .join(" ");

  const gridY = [0, 25, 50, 75, 100];

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-[260px] w-full">
        {/* grid */}
        {gridY.map((gy) => (
          <g key={gy}>
            <line
              x1={padding.left}
              x2={width - padding.right}
              y1={y(gy)}
              y2={y(gy)}
              className="stroke-slate-200"
              strokeDasharray="4 6"
              strokeWidth="1"
            />
            <text
              x={padding.left - 10}
              y={y(gy) + 4}
              textAnchor="end"
              className="fill-slate-400"
              fontSize="12"
            >
              {gy}
            </text>
          </g>
        ))}

        {/* vertical grid */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={padding.left + i * ((width - padding.left - padding.right) / 4)}
            x2={padding.left + i * ((width - padding.left - padding.right) / 4)}
            y1={padding.top}
            y2={height - padding.bottom}
            className="stroke-slate-200"
            strokeDasharray="4 6"
            strokeWidth="1"
          />
        ))}

        {/* line */}
        <path d={d} fill="none" className="stroke-cyan-500" strokeWidth="3" />

        {/* points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={x(i)}
            cy={y(p)}
            r={6}
            className="fill-cyan-500"
          />
        ))}
      </svg>
    </div>
  );
}

function StatCard({
  title,
  value,
  delta,
  deltaLabel,
  icon,
}: {
  title: string;
  value: string;
  delta?: string;
  deltaLabel?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="text-[14px] text-slate-600">{title}</div>
          <div className="text-[22px] font-semibold text-slate-900">{value}</div>

          {(delta || deltaLabel) && (
            <div className="flex items-center gap-2 text-[12px]">
              {delta ? (
                <span className="text-emerald-600">{delta}</span>
              ) : null}
              {deltaLabel ? <span className="text-slate-500">{deltaLabel}</span> : null}
            </div>
          )}
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-700">
          {icon}
        </div>
      </div>
    </div>
  );
}

function Segmented({
  value,
  onChange,
}: {
  value: MetricTab;
  onChange: (v: MetricTab) => void;
}) {
  const tabs: MetricTab[] = ["MRR", "Users", "Validation Score"];
  return (
    <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={classNames(
            "rounded-lg px-3 py-2 text-[12px] transition",
            value === t
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-50"
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function ProjectsTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.25 }}
      className="rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-6 py-4">
        <div>
          <h2 className="text-[15px] font-medium text-slate-900">Projects</h2>
          <p className="mt-0.5 text-[12px] text-slate-500">
            Manage your SaaS projects and their status.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-[12px] font-medium text-white shadow-sm transition hover:opacity-90">
          <Plus size={14} />
          New Project
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-3 text-left text-[12px] font-medium text-slate-600">
                Project Name
              </th>
              <th className="px-6 py-3 text-left text-[12px] font-medium text-slate-600">
                Status
              </th>
              <th className="px-6 py-3 text-left text-[12px] font-medium text-slate-600">
                MRR
              </th>
              <th className="px-6 py-3 text-left text-[12px] font-medium text-slate-600">
                Last Update
              </th>
              <th className="px-6 py-3 text-right text-[12px] font-medium text-slate-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <motion.tr
                key={project.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.22, delay: 0.3 + index * 0.05 }}
                className="border-b border-slate-100 transition hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <div className="text-[14px] font-medium text-slate-900">
                    {project.name}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={classNames(
                      "inline-flex items-center rounded-full px-2.5 py-1 text-[11px]",
                      statusConfig[project.status].color
                    )}
                  >
                    {statusConfig[project.status].label}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-[14px] text-slate-900">{project.mrr}</span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-[13px] text-slate-500">{project.lastUpdate}</span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <motion.button
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:shadow-md"
                    >
                      <ExternalLink size={14} />
                      Open
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05, rotate: 90 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900 hover:shadow-md"
                      aria-label="More"
                    >
                      <MoreVertical size={16} />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function SidebarItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={classNames(
        "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[14px] transition",
        active ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      )}
    >
      <span className={classNames("text-slate-600", active && "text-slate-900")}>
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

export default function Page() {
  const [tab, setTab] = useState<MetricTab>("MRR");

  const series = useMemo(() => {
    // similar to screenshot: rising line with 6 points
    if (tab === "MRR") return [68, 72, 78, 82, 85, 88];
    if (tab === "Users") return [12, 18, 25, 31, 36, 44];
    return [70, 73, 79, 83, 86, 88];
  }, [tab]);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">
      <div className="mx-auto flex min-h-screen w-full max-w-[1400px]">
        {/* SIDEBAR */}
        <aside className="hidden w-[260px] flex-shrink-0 border-r border-slate-200 bg-white px-4 py-5 md:block">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white">
              V
            </div>
            <div className="text-[16px] font-semibold text-slate-900">Vexly</div>
          </div>

          <div className="mt-6 space-y-1">
            <SidebarItem icon={<LayoutGrid size={18} />} label="Overview" active />
            <SidebarItem icon={<FolderKanban size={18} />} label="Projects" />
            <SidebarItem icon={<Eye size={18} />} label="MVP Preview" />
            <SidebarItem icon={<BarChart3 size={18} />} label="Analytics" />
            <SidebarItem icon={<CreditCard size={18} />} label="Billing" />
            <SidebarItem icon={<Settings size={18} />} label="Settings" />
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1">
          {/* TOP BAR */}
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
            <div className="text-[40px] font-extrabold tracking-tight text-slate-900">
              Overview
            </div>

            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-[13px] font-medium text-white shadow-sm transition hover:opacity-90">
                <Plus size={16} />
                New Project
              </button>

              <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[13px] font-medium text-slate-700 shadow-sm transition hover:border-slate-300">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-[12px] font-semibold text-white">
                  JD
                </span>
                <ChevronDown size={16} className="text-slate-500" />
              </button>
            </div>
          </div>

          {/* CONTENT */}
          <div className="px-6 py-6">
            {/* STAT CARDS */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="SaaS Projects"
                value="4"
                delta="↑ 2"
                deltaLabel="vs last month"
                icon={<Building2 size={18} />}
              />
              <StatCard
                title="Active Previews"
                value="1"
                icon={<Eye size={18} />}
              />
              <StatCard
                title="Monthly Revenue"
                value="$7,600"
                delta="↑ 12.5%"
                deltaLabel="vs last month"
                icon={<DollarSign size={18} />}
              />
              <StatCard
                title="Validation Score"
                value="88/100"
                delta="↑ 3 pts"
                deltaLabel="vs last month"
                icon={<TrendingUp size={18} />}
              />
            </div>

            {/* CHART CARD */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="text-[34px] font-extrabold tracking-tight text-slate-900">
                  Metrics Overview
                </div>
                <Segmented value={tab} onChange={setTab} />
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
                <LineChart points={series} />
              </div>
            </motion.div>

            {/* PROJECTS TABLE */}
            <div className="mt-6">
              <ProjectsTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
