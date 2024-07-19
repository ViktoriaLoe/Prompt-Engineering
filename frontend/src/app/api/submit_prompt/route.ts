import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { promptName, text, instructions } = await req.json();

    if (!promptName || !text || !instructions) {
      return NextResponse.json({ error: "promptName, text, and instructions are required" }, { status: 400 });
    }

    const response = await fetch("http://127.0.0.1:5000/submit_prompt", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ promptName, text, instructions }),
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process the prompt' }, { status: 500 });
  }
}
