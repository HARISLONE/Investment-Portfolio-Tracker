import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { formatCurrency } from "../../lib/portfolio";

const COLORS = ["#10b981", "#0ea5e9", "#a78bfa", "#f59e0b", "#ef4444"];

export default function PortfolioPie({ data, currency = "INR" }) {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={2}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(v) => formatCurrency(v, currency)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
