import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE_NAME);
    const promptCollection = db.collection("prompts");

    const { data } = await request.json();

    // Assuming 'data' contains the new prompt object
    const result = await promptCollection.insertOne(data);

    return NextResponse.json({ message: "Prompt added successfully", insertedId: result.insertedId });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save the prompt" }, { status: 500 });
  }
}

