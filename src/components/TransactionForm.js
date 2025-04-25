import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";

const categories = ["Food", "Transport", "Utilities", "Entertainment", "Health", "Others"];

export default function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Others");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || description.length < 3) return setError("Invalid description");
    if (!amount || isNaN(amount)) return setError("Invalid amount");
    if (!date) return setError("Invalid date");

    setError("");
    await onAdd({ description, amount: parseFloat(amount), date, category });
    setDescription("");
    setAmount("");
    setDate("");
    setCategory("Others");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert>{error}</Alert>}
      <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded w-full">
        {categories.map((cat) => <option key={cat}>{cat}</option>)}
      </select>
      <Button type="submit">Add Transaction</Button>
    </form>
  );
}
