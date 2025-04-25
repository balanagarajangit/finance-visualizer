import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function MonthlyBarChart({ transactions }) {
  const monthly = {};
  transactions.forEach(t => {
    const month = new Date(t.date).toLocaleString("default", { month: "short", year: "numeric" });
    monthly[month] = (monthly[month] || 0) + Math.abs(t.amount);
  });

  const data = Object.entries(monthly).map(([month, total]) => ({ month, total }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}