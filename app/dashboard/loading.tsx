export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto flex max-w-5xl animate-pulse flex-col gap-6">
        <div className="h-6 w-1/3 rounded bg-slate-200" />
        <div className="h-32 rounded-2xl bg-white" />
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-28 rounded-2xl bg-white" />
          ))}
        </div>
        <div className="h-64 rounded-2xl bg-white" />
      </div>
    </div>
  );
}
