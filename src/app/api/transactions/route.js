import { connectDB } from "@/lib/mongo";

export async function GET(req) {
  const db = await connectDB();
  const transactions = await db.collection("transactions").find({}).toArray();
  return new Response(JSON.stringify({ success: true, data: transactions }), { status: 200 });
}

export async function POST(req) {
  const body = await req.json();
  const { description, amount, date, category, budget } = body;
  const db = await connectDB();
  await db.collection("transactions").insertOne({ description, amount, date, category, budget });
  return new Response(JSON.stringify({ success: true }), { status: 201 });
}

export async function DELETE(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const db = await connectDB();
  await db.collection("transactions").deleteOne({ _id: new ObjectId(id) });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}