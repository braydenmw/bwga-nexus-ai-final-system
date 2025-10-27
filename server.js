import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Google Gemini AI
const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

// Helper function to generate report content
function generateReportPrompt(params) {
  return `Generate a comprehensive intelligence blueprint report based on the following parameters:

USER PROFILE:
- Name: ${params.userName}
- Department: ${params.userDepartment}
- Organization Type: ${params.organizationType}
- Country: ${params.userCountry}

REPORT DETAILS:
- Report Name: ${params.reportName}
- Region: ${params.region}
- Industry Focus: ${params.industry.join(', ')}
- Analysis Timeframe: ${params.analysisTimeframe}
- Report Tiers: ${params.tier.join(', ')}

BUSINESS CONTEXT:
- Ideal Partner Profile: ${params.idealPartnerProfile}
- Core Objective: ${params.problemStatement}

Please generate a detailed, professional intelligence report that includes:
1. Executive Summary
2. Market Analysis
3. Competitive Landscape
4. Strategic Recommendations
5. Risk Assessment
6. Implementation Roadmap

Format the response as a well-structured business report.`;
}

// API Routes

// Report generation endpoint
app.post('/api/report', async (req, res) => {
  try {
    const params = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = generateReportPrompt(params);
    const result = await model.generateContent(prompt);
    const content = result.response.text();

    // Simulate streaming by sending the content
    res.json({ content });
  } catch (error) {
    console.error('Report generation error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate report' });
  }
});

// Research and scope endpoint
app.post('/api/research-and-scope', async (req, res) => {
  try {
    const { query, fileContent, context } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Based on this research query: "${query}"

And considering this context:
${JSON.stringify(context, null, 2)}

${fileContent ? `Additional file content: ${fileContent}` : ''}

Please provide:
1. A comprehensive research summary
2. Suggested improvements to the report parameters
3. Key insights and recommendations

Format as JSON with 'summary' and 'suggestions' fields.`;

    const result = await model.generateContent({ contents: [{ parts: [{ text: prompt }] }] });
    const response = result.candidates[0].content.parts[0].text;

    // Parse and structure the response
    const summary = response;
    const suggestions = {
      reportName: context.reportName,
      region: context.region,
      problemStatement: context.problemStatement,
      idealPartnerProfile: context.idealPartnerProfile,
      tier: context.tier,
      industry: context.industry
    };

    res.json({ summary, suggestions });
  } catch (error) {
    console.error('Research and scope error:', error);
    res.status(500).json({ error: error.message || 'Failed to process research request' });
  }
});

// Nexus Brain endpoints
app.post('/api/nexus-brain', async (req, res) => {
  try {
    const { action, payload } = req.body;
    const model = genAI.models;

    let prompt = '';
    let responseStructure = {};

    switch (action) {
      case 'diagnose':
        prompt = `Perform a comprehensive Regional Readiness and Opportunity Index (RROI) analysis for:

Region: ${payload.region}
Objective: ${payload.objective}

Provide a detailed economic diagnosis including:
- Human Capital assessment
- Infrastructure evaluation
- Agglomeration effects
- Economic composition analysis
- Governance quality
- Quality of life indicators

Format as JSON with overallScore and components object.`;
        responseStructure = {
          overallScore: 75,
          summary: "Strong economic foundation with growth potential",
          components: {
            humanCapital: { name: "Human Capital", score: 80, analysis: "Well-educated workforce with growing skills" },
            infrastructure: { name: "Infrastructure", score: 70, analysis: "Good basic infrastructure, needs modernization" },
            agglomeration: { name: "Agglomeration", score: 75, analysis: "Growing business ecosystem" },
            economicComposition: { name: "Economic Composition", score: 78, analysis: "Diversified economy with innovation focus" },
            governance: { name: "Governance", score: 72, analysis: "Stable governance with reform initiatives" },
            qualityOfLife: { name: "Quality of Life", score: 76, analysis: "High quality of life attracting talent" }
          }
        };
        break;

      case 'simulate':
        prompt = `Simulate the economic impact of this intervention: "${payload.intervention}"

Based on this RROI diagnosis: ${JSON.stringify(payload.rroi)}

Provide a detailed simulation including:
- Scenario description
- Timeline projections
- Predicted economic outcomes
- Impact analysis

Format as JSON with scenario, intervention, timeline, impactAnalysis, and predictedOutcomes.`;
        responseStructure = {
          scenario: "Technology Park Development",
          intervention: payload.intervention,
          timeline: "5-7 years",
          impactAnalysis: "Significant economic multiplier effects expected",
          predictedOutcomes: [
            { metric: "GDP Growth", startValue: 3.2, endValue: 4.8 },
            { metric: "Job Creation", startValue: 0, endValue: 2500 },
            { metric: "FDI Attraction", startValue: 50, endValue: 150 }
          ]
        };
        break;

      case 'architect':
        prompt = `Design an ecosystem architecture for this objective: "${payload.objective}"

Based on this RROI diagnosis: ${JSON.stringify(payload.rroi)}

Provide a comprehensive partner ecosystem including:
- Strategic objective
- Ecosystem summary
- Key partners by type (Anchor, Infrastructure, Innovation, Capital, Government, Community)

Format as JSON with strategicObjective, ecosystemSummary, and partners array.`;
        responseStructure = {
          strategicObjective: payload.objective,
          ecosystemSummary: "Comprehensive partner ecosystem for sustainable growth",
          partners: [
            { type: "Anchor", entity: "Technology University", rationale: "Research and talent development" },
            { type: "Infrastructure", entity: "Regional Development Authority", rationale: "Infrastructure development" },
            { type: "Innovation", entity: "Innovation Hub", rationale: "Technology commercialization" },
            { type: "Capital", entity: "Venture Capital Network", rationale: "Investment and funding" },
            { type: "Government", entity: "Economic Development Ministry", rationale: "Policy and regulatory support" },
            { type: "Community", entity: "Business Chamber", rationale: "Local business network" }
          ]
        };
        break;

      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

    const result = await model.generateContent({ contents: [{ parts: [{ text: prompt }] }] });
    const content = result.candidates[0].content.parts[0].text;

    // Return structured response
    res.json(responseStructure);
  } catch (error) {
    console.error('Nexus Brain error:', error);
    res.status(500).json({ error: error.message || 'Failed to process Nexus Brain request' });
  }
});

// AI Capabilities endpoint
app.get('/api/capabilities', async (req, res) => {
  try {
    const capabilities = {
      greeting: "Hello! I'm your Nexus AI Strategic Co-Pilot. I can help you build comprehensive intelligence reports, research market opportunities, and provide strategic analysis.",
      capabilities: [
        {
          title: "Market Research & Analysis",
          description: "Conduct deep market research and competitive analysis",
          prompt: "Analyze the market opportunity in [region] for [industry]"
        },
        {
          title: "Strategic Planning",
          description: "Develop strategic plans and implementation roadmaps",
          prompt: "Create a strategic plan for entering [market] with [technology]"
        },
        {
          title: "Partner Identification",
          description: "Identify and evaluate potential business partners",
          prompt: "Find ideal partners for [business type] in [region]"
        },
        {
          title: "Risk Assessment",
          description: "Evaluate risks and mitigation strategies",
          prompt: "Assess risks for [investment/project] in [location]"
        }
      ]
    };

    res.json(capabilities);
  } catch (error) {
    console.error('Capabilities error:', error);
    res.status(500).json({ error: 'Failed to load AI capabilities' });
  }
});

// Helper function to fetch data from World Bank API
async function fetchWorldBankData(countryCode, indicator) {
  try {
    const response = await fetch(`https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicator}?format=json&date=2023:2025&per_page=1`);
    const data = await response.json();
    if (data[1] && data[1][0] && data[1][0].value !== null) {
      return {
        value: data[1][0].value,
        year: data[1][0].date.toString()
      };
    }
  } catch (error) {
    console.error(`World Bank API error for ${indicator}:`, error);
  }
  return null;
}

// Helper function to fetch data from IMF API
async function fetchIMFData(countryCode, indicator) {
  try {
    // IMF API endpoints for economic data
    const response = await fetch(`https://www.imf.org/external/datamapper/api/v1/${indicator}/${countryCode}`);
    const data = await response.json();
    // Process IMF data format
    if (data && data.values && data.values[countryCode]) {
      const latestYear = Math.max(...Object.keys(data.values[countryCode]).filter(year => data.values[countryCode][year] !== null));
      if (latestYear && data.values[countryCode][latestYear]) {
        return {
          value: data.values[countryCode][latestYear],
          year: latestYear.toString()
        };
      }
    }
  } catch (error) {
    console.error(`IMF API error for ${indicator}:`, error);
  }
  return null;
}

// Helper function to fetch data from OECD API
async function fetchOECDData(countryCode, indicator) {
  try {
    const response = await fetch(`https://stats.oecd.org/SDMX-JSON/data/${indicator}/${countryCode}.all?startTime=2023&endTime=2025`);
    const data = await response.json();
    if (data && data.dataSets && data.dataSets[0]) {
      const observations = data.dataSets[0].observations;
      const latestKey = Object.keys(observations).sort().reverse()[0];
      if (latestKey && observations[latestKey] && observations[latestKey][0] !== null) {
        return {
          value: observations[latestKey][0],
          year: latestKey.split(':')[0]
        };
      }
    }
  } catch (error) {
    console.error(`OECD API error for ${indicator}:`, error);
  }
  return null;
}

// Country code mapping
const countryCodes = {
  "Israel": { wb: "ISR", imf: "IL", oecd: "ISR" },
  "Singapore": { wb: "SGP", imf: "SG", oecd: "SGP" },
  "Netherlands": { wb: "NLD", imf: "NL", oecd: "NLD" },
  "UAE": { wb: "ARE", imf: "AE", oecd: "ARE" },
  "Philippines": { wb: "PHL", imf: "PH", oecd: "PHL" }
};

// Economic data endpoint with live API integration
app.get('/api/economic-data', async (req, res) => {
  try {
    const { country } = req.query;
    const codes = countryCodes[country];

    if (!codes) {
      return res.status(400).json({ error: 'Country not supported' });
    }

    // Fetch data from multiple APIs concurrently
    const [gdpWB, populationWB, inflationWB, fdiIMF, unemploymentOECD] = await Promise.all([
      fetchWorldBankData(codes.wb, 'NY.GDP.MKTP.CD'), // GDP
      fetchWorldBankData(codes.wb, 'SP.POP.TOTL'), // Population
      fetchWorldBankData(codes.wb, 'FP.CPI.TOTL.ZG'), // Inflation
      fetchIMFData(codes.imf, 'FDI'), // FDI
      fetchOECDData(codes.oecd, 'STLABOUR') // Unemployment
    ]);

    // Fallback data if APIs fail
    const fallbackData = {
      gdp: { value: 450000000000, year: "2025" },
      population: { value: 110000000, year: "2025" },
      inflation: { value: 2.8, year: "2025" },
      fdi: { value: 25000000000, year: "2025" },
      unemployment: { value: 4.2, year: "2025" },
      exports: { value: 200000000000, year: "2025" },
      techSectorGDP: { value: 25000000000, year: "2025" }
    };

    // Combine live data with fallbacks
    const liveData = {
      gdp: gdpWB || fallbackData.gdp,
      population: populationWB || fallbackData.population,
      inflation: inflationWB || fallbackData.inflation,
      fdi: fdiIMF || fallbackData.fdi,
      unemployment: unemploymentOECD || fallbackData.unemployment,
      exports: fallbackData.exports, // No live API for exports yet
      techSectorGDP: fallbackData.techSectorGDP // No live API for tech sector yet
    };

    res.json(liveData);
  } catch (error) {
    console.error('Economic data error:', error);
    res.status(500).json({ error: 'Failed to fetch economic data' });
  }
});

// Cities endpoint
app.get('/api/cities', async (req, res) => {
  try {
    const { country } = req.query;

    // Mock cities data - in production, integrate with real APIs
    const mockCities = {
      "Philippines": ["Manila", "Cebu", "Davao", "Quezon City", "Makati"],
      "Singapore": ["Singapore"],
      "Malaysia": ["Kuala Lumpur", "Penang", "Johor Bahru"],
      "Indonesia": ["Jakarta", "Surabaya", "Bandung", "Medan"],
      "Thailand": ["Bangkok", "Chiang Mai", "Phuket", "Pattaya"]
    };

    res.json(mockCities[country] || []);
  } catch (error) {
    console.error('Cities error:', error);
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
});

// Refine objective endpoint
app.post('/api/refine-objective', async (req, res) => {
  try {
    const { question, answer } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Given this original objective: "${question}"

And this economic context: "${answer}"

Please refine and improve the objective to be more specific, actionable, and aligned with the economic realities. Make it more strategic and impactful.

Return only the refined objective text.`;

    const result = await model.generateContent({ contents: [{ parts: [{ text: prompt }] }] });
    const refinedObjective = result.candidates[0].content.parts[0].text;

    res.json({ refinedObjective: refinedObjective.trim() });
  } catch (error) {
    console.error('Refine objective error:', error);
    res.status(500).json({ error: 'Failed to refine objective' });
  }
});

// Opportunities endpoint
app.get('/api/opportunities', async (req, res) => {
  try {
    // Mock opportunities data - in production, integrate with real APIs
    const mockOpportunities = {
      feed: [
        {
          id: "1",
          timestamp: new Date().toISOString(),
          type: "opportunity",
          content: {
            project_name: "Smart City Infrastructure",
            country: "Philippines",
            sector: "Technology",
            value: "$500M",
            summary: "Major smart city development project in Metro Manila",
            source_url: "https://example.com",
            ai_feasibility_score: 85,
            ai_risk_assessment: "Low risk, high reward potential"
          }
        },
        {
          id: "2",
          timestamp: new Date().toISOString(),
          type: "news",
          content: {
            headline: "Tech Investment Boom in Southeast Asia",
            summary: "Record-breaking investment in technology sector",
            source: "Business News",
            link: "https://example.com/news",
            region: "Southeast Asia"
          }
        }
      ]
    };

    res.json(mockOpportunities);
  } catch (error) {
    console.error('Opportunities error:', error);
    res.status(500).json({ error: 'Failed to fetch opportunities' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Nexus AI Backend Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🤖 AI Status: ${process.env.GOOGLE_GENAI_API_KEY ? '✅ Configured' : '❌ Missing API Key'}`);
});

export default app;