import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE_NAME);
    const resultCollection = db.collection("results");

    const { result, tokens } = await request.json();

    // Assuming 'result' and 'tokens' are provided in the request body
    const newResult = {
      result,
      tokens,
      createdAt: new Date(),
    };

    const insertResult = await resultCollection.insertOne(newResult);

    return NextResponse.json({ message: "Result saved successfully", insertedId: insertResult.insertedId });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save the result" }, { status: 500 });
  }
}
