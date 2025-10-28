
import OpenAI from 'openai';

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return new Response(JSON.stringify({ error: 'API key is not configured' }), { status: 500 });
  }

  try {
    const { text } = await request.json();

    if (!text) {
      return new Response(JSON.stringify({ error: 'Text parameter is required.' }), { status: 400 });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });

    const buffer = await mp3.arrayBuffer();
    const base64Audio = Buffer.from(buffer).toString('base64');

    return new Response(JSON.stringify({ audioContent: base64Audio }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error in /api/tts:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
