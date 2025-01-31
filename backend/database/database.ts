import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const DATABASE_NAME = "valentine2025";

let db: Db;

export async function connectToDB(): Promise<void> {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    db = client.db(DATABASE_NAME);
    console.log("✅ Connected to database successfully!");
    const collectionName = "users";
    const collections = await db.listCollections({ name: collectionName }).toArray();

    if (collections.length === 0) {
      await db.createCollection(collectionName);
      console.log(`Collection "${collectionName}" created.`);
    } else {
      console.log(`ℹ️  Collection "${collectionName}" already exists.`);
    }
  } catch (error) {
    console.error(`Failed to connect to database: ${error}`);
  }
}

export function getDB(): Db {
  if (!db) throw new Error("Database not initialized");
  return db;
}
