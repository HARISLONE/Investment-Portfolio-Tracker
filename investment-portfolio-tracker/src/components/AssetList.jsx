import React from "react";
import { filterByType, searchHoldings, holdingValue, formatCurrency } from "../lib/portfolio";

export default function AssetList({ holdings, quotes, onSelect, currency = "INR" }) {
  const [type, setType] = React.useState("all");
  const [q, setQ] = React.useState("");

  const filtered = searchHoldings(filterByType(holdings, type), q);

  return (
    <div className="space-y-3">
      {/* controls */}
      <div className="flex items-center gap-2">
        {["all", "stock", "crypto"].map(t => (
          <button key={t}
            onClick={() => setType(t)}
            className={`rounded-lg border px-3 py-1.5 text-sm ${type===t ? "bg-emerald-500 text-white border-emerald-500" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
            {t[0].toUpperCase()+t.slice(1)}
          </button>
        ))}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search symbol…"
          className="ml-auto w-48 rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
        />
      </div>

      {/* table */}
      <div className="overflow-hidden rounded-xl border border-black/5 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-3 py-2 text-left">Symbol</th>
              <th className="px-3 py-2 text-right">Price</th>
              <th className="px-3 py-2 text-right">Day %</th>
              <th className="px-3 py-2 text-right">Qty</th>
              <th className="px-3 py-2 text-right">Value</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(h => {
              const qd = quotes[h.symbol] || { price: 0, changePct: 0 };
              const value = holdingValue(h, quotes);
              return (
                <tr key={h.symbol} className="border-t hover:bg-slate-50 cursor-pointer" onClick={() => onSelect(h)}>
                  <td className="px-3 py-2 font-medium text-slate-900">{h.symbol}</td>
                  <td className="px-3 py-2 text-right">{formatCurrency(qd.price, currency)}</td>
                  <td className={`px-3 py-2 text-right ${qd.changePct>=0?"text-emerald-600":"text-rose-600"}`}>{qd.changePct?.toFixed(2)}%</td>
                  <td className="px-3 py-2 text-right">{h.qty}</td>
                  <td className="px-3 py-2 text-right">{formatCurrency(value, currency)}</td>
                </tr>
              );
            })}
            {!filtered.length && (
              <tr><td className="px-3 py-6 text-center text-slate-500" colSpan={5}>No results</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
