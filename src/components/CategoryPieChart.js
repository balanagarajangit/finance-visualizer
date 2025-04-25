import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8A2BE2", "#DC143C"];

export default function CategoryPieChart({ transactions }) {
  const grouped = transactions.reduce((acc, t) => {
    const key = t.category || "Others";
    acc[key] = (acc[key] || 0) + Math.abs(t.amount);
    return acc;
  }, {});
  const data = Object.entries(grouped).map(([name, value]) => ({ name, value }));

  return (
    <PieChart width={400} height={300}>
      <Pie data={data} cx="50%" cy="50%" label outerRadius={80} fill="#8884d8" dataKey="value">
        {data.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
