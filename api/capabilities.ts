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
    
    // For local development, always use mock data
    // OpenAI API key will be configured in Vercel environment variables
    const mockCapabilities = {
      greeting: "Hello, I am the Nexus Inquire AI assistant for BWGA Nexus AI.",
      capabilities: [
        {
          title: "Strategic Intelligence Reports",
          description: "Generate comprehensive intelligence blueprints for regional development opportunities",
          prompt: "I need to analyze investment opportunities in Southeast Asia for manufacturing partnerships."
        },
        {
          title: "Partner Matching",
          description: "Identify and match potential foreign business partners for your regional development goals",
          prompt: "Find technology partners in Vietnam for digital infrastructure development."
        },
        {
          title: "Market Research & Analysis",
          description: "Conduct deep-dive analysis of market opportunities and competitive landscapes",
          prompt: "Analyze the renewable energy market in the Philippines."
        }
      ]
    };

    return new Response(JSON.stringify(mockCapabilities), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=300' // Cache for 5 minutes during development
        },
    });
}