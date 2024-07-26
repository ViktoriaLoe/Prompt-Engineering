import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE_NAME);
    const promptCollection = db.collection("prompts");
    const mockdataCollection = db.collection("mockdata");

    const prompts = await promptCollection.find({}).toArray();
    const mockdata = await mockdataCollection.find({}).toArray();

    return NextResponse.json({ prompts, mockdata });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}