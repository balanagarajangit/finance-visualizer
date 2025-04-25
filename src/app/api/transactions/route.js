import { connectDB } from "@/lib/mongo";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const db = await connectDB();
    const transactions = await db.collection("transactions").find({}).toArray();
    return new Response(JSON.stringify({ success: true, data: transactions }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { description, amount, date, category, budget } = body;
    if (!description || !amount || !date) {
      return new Response(JSON.stringify({ success: false, message: "Description, amount, and date are required." }), { status: 400 });
    }
    const transaction = {
      description,
      amount,
      date: new Date(date), 
      category: category || "Uncategorized",
      budget: budget || 0,
    };

    const db = await connectDB();
    await db.collection("transactions").insertOne(transaction);
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ success: false, message: "Transaction ID is required." }), { status: 400 });
    }

    const db = await connectDB();
    const result = await db.collection("transactions").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ success: false, message: "Transaction not found." }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}
