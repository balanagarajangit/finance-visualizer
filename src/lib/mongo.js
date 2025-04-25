import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function connectDB() {
  if (!client.isConnected) await client.connect();
  return client.db("financeApp");
}