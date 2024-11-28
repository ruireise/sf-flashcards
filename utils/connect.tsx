//Mongo DB connection

import { MongoClient, Db } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connect(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    const db = client.db("Flashcards");

    cachedClient = client;
    cachedDb = db;
    console.log("Successfully connected to Atlas");

    return { client, db };
  } catch (err) {
    console.error(err.stack);
    throw new Error("Database connection failed");
  }
}
