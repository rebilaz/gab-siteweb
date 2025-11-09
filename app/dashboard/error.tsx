"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-white p-8 text-center">
        <p className="text-lg font-semibold text-red-600">
          Impossible de charger le dashboard
        </p>
        <p className="mt-2 text-sm text-slate-500">
          {error.message}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
