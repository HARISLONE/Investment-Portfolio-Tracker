import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { formatCurrency } from "../../lib/portfolio";

export default function PortfolioLine({ data, currency = "INR" }) {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="t" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => formatCurrency(v, currency).replace(/[^0-9]/g,"")} />
          <Tooltip
            formatter={(v) => formatCurrency(v, currency)}
            labelStyle={{ fontSize: 12 }}
            contentStyle={{ borderRadius: 8 }}
          />
          <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2.2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
