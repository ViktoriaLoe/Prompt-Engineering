import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { promptName, text, instructions } = await req.json();
    
    const response = await fetch('http://your-backend-url/submit_prompt', {
      method: 'POST',
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
