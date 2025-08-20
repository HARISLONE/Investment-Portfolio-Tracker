import React from "react";
import { formatCurrency } from "../lib/portfolio";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function AssetDrawer({ asset, quote, onClose, currency="INR" }) {
  if (!asset) return null;

  // tiny mock sparkline (replace with real later)
  const data = Array.from({ length: 20 }, (_, i) => ({ t: i+1, v: (quote?.price ?? 0) * (0.95 + Math.random()*0.1) }));

  return (
    <div className="fixed inset-0 z-50">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      {/* panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl p-5 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">{asset.symbol}</h3>
          <button onClick={onClose} className="rounded-lg border px-2 py-1 text-sm hover:bg-slate-50">Close</button>
        </div>

        <div className="mt-3 text-sm text-slate-600">Type: {asset.type} · Qty: {asset.qty}</div>
        <div className="mt-1 text-2xl font-semibold">{formatCurrency((quote?.price ?? 0), currency)}
          <span className={`ml-2 text-sm ${quote?.changePct>=0?"text-emerald-600":"text-rose-600"}`}>
            {quote?.changePct?.toFixed(2)}%
          </span>
        </div>

        <div className="mt-5 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="t" hide />
              <YAxis hide />
              <Tooltip />
              <Line type="monotone" dataKey="v" stroke="#0ea5e9" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border p-3">
            <div className="text-xs text-slate-500">Avg Buy</div>
            <div className="text-sm font-semibold">{formatCurrency(asset.avgBuy, currency)}</div>
          </div>
          <div className="rounded-xl border p-3">
            <div className="text-xs text-slate-500">Current Value</div>
            <div className="text-sm font-semibold">{formatCurrency((quote?.price ?? 0) * asset.qty, currency)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
