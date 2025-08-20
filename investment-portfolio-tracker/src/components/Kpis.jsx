import { computeTotals, formatCurrency } from "../lib/portfolio";

export default function Kpis({ holdings, quotes, currency = "INR" }) {
  const { totalValue, dayPL, dayPLPct } = computeTotals(holdings, quotes);

  const items = [
    { label: "Total Value", value: formatCurrency(totalValue, currency), sub: "" },
    { label: "Day P/L", value: formatCurrency(dayPL, currency), sub: `${dayPLPct.toFixed(2)}%`, up: dayPL >= 0 },
    { label: "Holdings", value: String(holdings.length), sub: "" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((k) => (
        <div key={k.label} className="rounded-2xl border border-black/5 bg-white p-4 shadow">
          <div className="text-xs text-slate-500">{k.label}</div>
          <div className="mt-1 text-lg font-semibold text-slate-900">{k.value}</div>
          {k.sub && (
            <div className={`mt-1 text-xs ${k.up ? "text-emerald-600" : "text-rose-600"}`}>{k.sub}</div>
          )}
        </div>
      ))}
    </div>
  );
}
