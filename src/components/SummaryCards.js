export default function SummaryCards({ transactions }) {
    const total = transactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const recent = transactions.slice(-5).reverse();
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold">Total Expenses</h3>
          <p className="text-2xl">₹ {Math.abs(total).toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow col-span-2">
          <h3 className="text-lg font-bold">Recent Transactions</h3>
          <ul className="mt-2">
            {recent.map((t, i) => (
              <li key={i}>{t.description} - ₹{Math.abs(t.amount)} ({t.category})</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  