import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

export function BudgetChart({ transactions, budgets }) {
  const actuals = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
    return acc;
  }, {});

  const data = Object.keys(budgets).map(cat => ({
    category: cat,
    budget: budgets[cat],
    spent: actuals[cat] || 0
  }));

  return (
    <BarChart width={600} height={300} data={data}>
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="budget" fill="#82ca9d" />
      <Bar dataKey="spent" fill="#8884d8" />
    </BarChart>
  );
}