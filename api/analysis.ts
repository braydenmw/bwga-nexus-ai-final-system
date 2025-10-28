import OpenAI from 'openai';

export const config = {
  runtime: 'edge',
};

const SYSTEM_PROMPT = `
You are Nexus AI's Deep-Dive Analysis engine. Your purpose is to generate a concise, structured intelligence brief for a specific development opportunity. The user is an economic development professional who needs a quick but insightful assessment to determine if this opportunity warrants further investigation.

Your output MUST be in Nexus Analysis & Decision Language (NADL). Do not include any other text or markdown.

**NADL v1.0 SCHEMA:**

1.  **<nad:report_title title="..." />**: The main title.
2.  **<nad:report_subtitle subtitle="..." />**: A subtitle describing the focus.
3.  **<nad:section title="...">...</nad:section>**: A container for a major section.
4.  **<nad:paragraph>...</nad:paragraph>**: A paragraph of text within a section.
5.  **<nad:recommendation>...</nad:recommendation>**: An actionable recommendation.

**ANALYSIS DIRECTIVE:**

Based on the provided project details and your own search-augmented knowledge, generate an analysis containing the following sections:

1.  **Market Opportunity Assessment:** Briefly analyze the market context. What is the demand for this project? What is the growth potential?
2.  **Strategic Fit Analysis:** How does this project align with the broader economic goals of the specified USER_REGION? Consider national or regional development plans.
3.  **Key Risk Factors:** Identify 2-3 primary risks (e.g., geopolitical, financial, logistical, regulatory). For each, provide a brief explanation.
4.  **Initial Recommendations:** Provide 2-3 high-level, actionable recommendations for the user's organization to consider if they were to pursue this opportunity.
`;

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return new Response(JSON.stringify({ error: 'API key is not configured' }), { status: 500, headers: { 'Content-Type': 'application/json' }});
  }

  try {
    const { item, region } = (await request.json()) as { item: any, region: string };

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
      **Deep-Dive Analysis Request:**

      **Project Name:** ${item.project_name}
      **Project Country:** ${item.country}
      **Sector:** ${item.sector}
      **Value:** ${item.value}
      **Summary:** ${item.summary}

      **User's Region of Interest for Strategic Fit:** ${region}

      **Your Task:**
      Generate the NADL v1.0 analysis based on these details.
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt }
      ],
      max_tokens: 2000,
      temperature: 0.7,
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const chunk of completion) {
          const text = chunk.choices[0]?.delta?.content;
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });

  } catch (error) {
    console.error("Error in /api/analysis:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
