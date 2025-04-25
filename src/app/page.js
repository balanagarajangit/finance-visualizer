"use client";

import React, { useEffect, useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import SummaryCards from "@/components/SummaryCards";
import MonthlyBarChart from "@/components/MonthlyBarChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import { BudgetChart } from "@/components/BudgetChart";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState({
    Food: 3000,
    Transport: 2000,
    Utilities: 1500,
    Entertainment: 1000,
    Health: 1000,
    Others: 500
  });

  
  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const json = await res.json();
    setTransactions(json.data);
  };

 
  const addTransaction = async (tx) => {
    await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tx)
    });

    
    setBudgets((prevBudgets) => ({
      ...prevBudgets,
      [tx.category]: prevBudgets[tx.category] - tx.amount, 
    }));

    fetchTransactions(); 
  };

  
  useEffect(() => {
    fetchTransactions();
  }, []);

  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Personal Finance Visualizer</h1>
      <TransactionForm onAdd={addTransaction} />
      <SummaryCards transactions={transactions} />

      <div className="display flex flex-col items-center">
        <h1 className="text-6xl pb-1.5">Charts </h1>
        <MonthlyBarChart transactions={transactions} />
        <h1 className="text-center text-2xl font-bold">Monthly Bar Chart</h1>
      </div>
      <div className="display flex flex-col items-center">
        <CategoryPieChart transactions={transactions} />
        <h1 className="text-2xl font-bold">Category Pie Chart</h1>
      </div>

      <div className="display flex flex-col items-center">
        <BudgetChart transactions={transactions} budgets={budgets} />
        <h1 className="text-center text-2xl font-bold">Budget Chart</h1>
      </div>


    </div>
  );
}