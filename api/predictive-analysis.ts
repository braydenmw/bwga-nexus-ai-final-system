import OpenAI from 'openai';
import type { LiveOpportunityItem } from '../types.ts';

export const config = {
  runtime: 'edge',
};

const SYSTEM_INSTRUCTION = `You are Nexus Brain, a specialized AI for futurist thinking and strategic foresight. Your task is to analyze a list of current development opportunities and provide a predictive analysis. Identify emerging trends, predict future opportunities that might arise from them, and highlight potential disruptions. Your response MUST be a valid JSON object.`;

// OpenAI doesn't need a schema definition like Gemini

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  if (!process.env.API_KEY) {
    return new Response(JSON.stringify({ error: 'API key is not configured' }), { status: 500 });
  }

  try {
    const { opportunities } = (await request.json()) as { opportunities: LiveOpportunityItem[] };

    if (!opportunities || opportunities.length === 0) {
      return new Response(JSON.stringify({ error: 'Opportunities data is required.' }), { status: 400 });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const context = opportunities.map(o => `- ${o.project_name} (${o.sector}, ${o.country}): ${o.summary}`).join('\n');

    const prompt = `Based on this list of current global opportunities, generate a predictive analysis:\n${context}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: SYSTEM_INSTRUCTION },
        { role: 'user', content: prompt }
      ],
      max_tokens: 2000,
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const analysis = JSON.parse(completion.choices[0].message.content || '{}');

    return new Response(JSON.stringify(analysis), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error in /api/predictive-analysis:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
}