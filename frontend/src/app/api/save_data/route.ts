import { NextResponse } from 'next/server';
import { mockdata, prompt } from "../../../../types";

export async function POST(request: Request) {
  try {
    const { data } = await request.json();

    const database_name = process.env.DATABASE_NAME;
    const collection_name =  process.env.COLLECTION_NAME_PROMPTS;
    
    if (!database_name || !collection_name || !data) {
      return NextResponse.json({ error: 'Missing database_name, collection_name, or data parameter' }, { status: 400 });
    }

    const response = await fetch('http://localhost:1234/save-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ database_name, collection_name, data }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const result = await response.json();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
