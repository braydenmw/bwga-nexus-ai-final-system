import OpenAI from 'openai';

export const config = {
  runtime: 'edge',
};

const SYSTEM_INSTRUCTION = `You are Nexus Inquire, an AI assistant for a strategic intelligence platform called BWGA Nexus AI. Your purpose is to help users generate complex intelligence reports by understanding their natural language goals.`;

const PROMPT = `
Introduce yourself briefly and list 3 of your core capabilities that would be most helpful to a user (like a government official or business strategist).
Focus on how you help turn a simple idea into a detailed report.
For each capability, also provide a compelling example prompt a user could try.
Your response MUST be a valid JSON object. Do not include any markdown fences.

Example Format:
{
  "greeting": "Hello, I am the Nexus Inquire AI assistant...",
  "capabilities": [
    {
      "title": "Translate Goals into Objectives",
      "description": "I can turn your high-level goals into a structured problem statement for a detailed report.",
      "prompt": "I need to attract semiconductor manufacturing to Arizona, USA."
    }
  ]
}
`;

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    greeting: { type: "string", description: "A brief, welcoming greeting from the AI assistant." },
    capabilities: {
      type: "array",
      description: "A list of the AI's core capabilities.",
      items: {
        type: "object",
        properties: {
          title: { type: "string", description: "The title of the capability." },
          description: { type: "string", description: "A short description of the capability." },
          prompt: { type: "string", description: "An example prompt a user can try." }
        },
        required: ['title', 'description', 'prompt']
      }
    }
  },
  required: ['greeting', 'capabilities']
};

export default async function handler(request: Request) {
    if (request.method !== 'GET') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
    }
    
    if (!process.env.OPENAI_API_KEY) {
        return new Response(JSON.stringify({ error: 'API key is not configured' }), { status: 500 });
    }

    try {
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });

        const completion = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: SYSTEM_INSTRUCTION },
            { role: 'user', content: PROMPT }
          ],
          max_tokens: 1000,
          temperature: 0.7,
          response_format: { type: "json_object" },
        });

        const jsonStr = completion.choices[0].message.content;
        const capabilities = JSON.parse(jsonStr);

        return new Response(JSON.stringify(capabilities), {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
            },
        });

    } catch (error) {
        console.error("Error in /api/capabilities:", error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return new Response(JSON.stringify({ error: `Failed to generate capabilities: ${errorMessage}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}