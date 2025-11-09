type Props = {
  label: string;
  value: string;
  helper?: string;
};

export default function KpiCard({ label, value, helper }: Props) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
      {helper ? (
        <p className="mt-1 text-xs text-slate-500">
          {helper}
        </p>
      ) : null}
    </div>
  );
}
