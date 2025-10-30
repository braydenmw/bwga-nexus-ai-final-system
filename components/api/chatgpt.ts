import OpenAI from 'openai';

export const config = { runtime: 'edge' };

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { query, context } = await request.json();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `You are the Nexus Enquire Copilot, an expert AI assistant for the BWGA Nexus AI 5-Step Framework.

Context from current wizard session: ${JSON.stringify(context)}

User query: "${query}"

Please provide a helpful, factual response that:
1. Searches for and provides relevant facts when requested
2. Offers guidance specific to the current step in the 5-step framework
3. Reviews and validates user inputs when asked
4. Suggests improvements or next steps
5. Maintains context from the wizard session

Keep responses concise but informative, and always be helpful and professional.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;

    return new Response(JSON.stringify({ response }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('ChatGPT API error:', error);
    return new Response(JSON.stringify({
      response: 'Sorry, I encountered an error while processing your request. Please try again.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}