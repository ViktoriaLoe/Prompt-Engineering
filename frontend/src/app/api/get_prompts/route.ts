import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const database_name = 'prompt_engineering_test'; // Replace with your database name
    const collection_name = 'prompts'; // Replace with your collection name

    const response = await fetch(`http://127.0.0.1:5000/get-all-data?database_name=${database_name}&collection_name=${collection_name}`);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}