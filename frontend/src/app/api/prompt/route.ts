import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt, data } = await req.json();

    if (!prompt || !data) {
      return NextResponse.json({ error: "Prompt and data are required" }, { status: 400 });
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
