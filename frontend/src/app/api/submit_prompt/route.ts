import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt, mockdata } = await req.json();

    if (!prompt || !mockdata) {
      return NextResponse.json({ error: "Prompt and mockdata are required" }, { status: 400 });
    }
    const response = await fetch("http://localhost:1234/submit_prompt", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt.promptText, data: mockdata.data }), // Ensure the payload matches the backend expectation
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process the prompt' }, { status: 500 });
  }
}