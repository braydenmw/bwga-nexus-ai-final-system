import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Helper function to generate report content with format-specific depth
function generateReportPrompt(params) {
  // Adjust content depth based on report format
  const formatDepth = {
    'brief': 'Provide 1 high-confidence company match with concise analysis (2-3 pages equivalent). Focus on the strongest partnership opportunity.',
    'standard': 'Provide 2-3 company matches with detailed analysis (10-15 pages equivalent). Include comprehensive synergy analysis and risk mapping.',
    'comprehensive': 'Provide 3-5 company matches with in-depth analysis (20-30 pages equivalent). Include extensive research, multiple scenarios, and strategic implications.'
  };
  const depthInstruction = formatDepth[params.reportLength || 'standard'] || formatDepth['standard'];

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
- AI Personas: ${params.aiPersona?.join(', ') || 'Not specified'}
- Analytical Lenses: ${params.analyticalLens?.join(', ') || 'Not specified'}

BUSINESS CONTEXT:
- Ideal Partner Profile: ${params.idealPartnerProfile}
- Core Objective: ${params.problemStatement}

REPORT DEPTH REQUIREMENTS (${params.reportLength?.toUpperCase() || 'STANDARD'} FORMAT):
${depthInstruction}

Please generate a detailed, professional intelligence report using the NSIL (Nexus Symbiotic Intelligence Language) schema that includes:

<nsil:match_making_analysis>
  <nsil:executive_summary>
    Concise overview of matchmaking results and strategic opportunity
  </nsil:executive_summary>

  <nsil:match_score value="0-100">
    Partnership potential score with justification
  </nsil:match_score>

  <nsil:match>
    <nsil:company_profile name="..." headquarters="..." website="...">
      Detailed company profile with business focus and strategic direction
    </nsil:company_profile>

    <nsil:synergy_analysis>
      Detailed analysis of partnership fit and mutual benefits
    </nsil:synergy_analysis>

    <nsil:risk_map>
      <nsil:zone color="green|yellow|red" title="Market Entry Ease">Analysis</nsil:zone>
      <nsil:zone color="green|yellow|red" title="Local Talent Alignment">Analysis</nsil:zone>
      <nsil:zone color="green|yellow|red" title="Regulatory Hurdles">Analysis</nsil:zone>
    </nsil:risk_map>
  </nsil:match>

  <nsil:strategic_outlook>
    Broader implications for regional development
  </nsil:strategic_outlook>

  <nsil:source_attribution>
    Key data sources and research links
  </nsil:source_attribution>
</nsil:match_making_analysis>

Format the response using proper NSIL schema with clear sections and actionable insights.`;
}

// API Routes

// Report generation endpoint with streaming support
app.post('/api/report', async (req, res) => {
  try {
    const params = req.body;

    // Adjust max tokens based on report format
    const maxTokensByFormat = {
      'brief': 1500,
      'standard': 3000,
      'comprehensive': 4000
    };
    const maxTokens = maxTokensByFormat[params.reportLength || 'standard'] || 3000;

    const prompt = generateReportPrompt(params);
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: maxTokens,
      temperature: 0.7,
      stream: true,
    });

    // Set headers for streaming
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Stream the response
    for await (const chunk of completion) {
      const text = chunk.choices[0]?.delta?.content;
      if (text) {
        res.write(text);
      }
    }

    res.end();
  } catch (error) {
    console.error('Report generation error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate report' });
  }
});

// Research and scope endpoint
app.post('/api/research-and-scope', async (req, res) => {
  try {
    const { query, fileContent, context } = req.body;

    const prompt = `You are BWGA Nexus AI's strategic co-pilot. Based on the user's entered information and their query, provide guidance that reflects their specific inputs and helps them progress through the report creation process.

USER'S CURRENT INPUTS:
- Name: ${context.userName || 'Not provided'}
- Report Name: ${context.reportName || 'Not provided'}
- Region: ${context.region || 'Not provided'}
- Industries: ${context.industry?.join(', ') || 'Not provided'}
- Core Objective: ${context.problemStatement || 'Not provided'}
- Ideal Partner Profile: ${context.idealPartnerProfile || 'Not provided'}
- Analysis Tiers: ${context.tier?.join(', ') || 'Not provided'}
- AI Personas: ${context.aiPersona?.join(', ') || 'Not provided'}

USER QUERY: "${query}"

${fileContent ? `ADDITIONAL CONTEXT FROM UPLOADED FILE: ${fileContent}` : ''}

Based on the user's specific inputs above, provide:
1. A comprehensive research summary that reflects their entered information and helps them understand what they've defined so far
2. Suggested improvements to their report parameters based on their current inputs
3. Key insights and recommendations tailored to their specific region, industries, and objectives

Format as JSON with 'summary' and 'suggestions' fields. Focus on their actual inputs, not generic AI capabilities.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;

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

// Nexus Brain endpoints - Now with actual AI analysis
app.post('/api/nexus-brain', async (req, res) => {
  try {
    const { action, payload } = req.body;

    let prompt = '';
    let responseStructure = {};

    switch (action) {
      case 'diagnose':
        prompt = `You are BWGA Nexus AI's Regional Readiness & Opportunity Index (RROI) analyzer. Analyze the following region and objective, then provide a comprehensive diagnosis that demonstrates you understand the specific context and requirements.

REGION: ${payload.region}
OBJECTIVE: ${payload.objective}

Based on this specific region and objective, provide a detailed RROI analysis that shows you understand:
- What makes this region unique for this objective
- Key strengths and challenges specific to this context
- How the objective aligns with regional characteristics
- Realistic opportunities and constraints

Format your response as a JSON object with:
- overallScore (0-100 based on fit for objective)
- summary (2-3 sentences showing understanding of region-objective fit)
- components object with 6 components, each having name, score (0-100), and analysis (2-3 sentences showing specific understanding)

Make the analysis specific to the region and objective provided - don't use generic responses.`;
        break;

      case 'simulate':
        prompt = `You are BWGA Nexus AI's Trajectory Prediction Tool (TPT). Analyze this intervention in the context of the specific region and objective.

REGION/OBJECTIVE CONTEXT: ${payload.rroi ? JSON.stringify(payload.rroi) : 'Not provided'}
INTERVENTION: "${payload.intervention}"

Provide a simulation that demonstrates understanding of:
- How this intervention specifically addresses the region's challenges
- Realistic timeline based on regional context
- Measurable outcomes relevant to the stated objectives
- Potential risks or challenges specific to this region

Format as JSON with:
- scenario (brief description showing understanding)
- intervention (echo the intervention)
- timeline (realistic timeframe)
- impactAnalysis (3-4 sentences showing specific understanding)
- predictedOutcomes (3-5 specific, measurable outcomes)

Make this analysis specific to the context provided.`;
        break;

      case 'architect':
        prompt = `You are BWGA Nexus AI's Strategic Ecosystem Architecture Model (SEAM). Design a partner ecosystem for this specific objective and region.

RROI CONTEXT: ${payload.rroi ? JSON.stringify(payload.rroi) : 'Not provided'}
OBJECTIVE: "${payload.objective}"

Design an ecosystem that demonstrates understanding of:
- The specific regional context and needs
- How partners complement each other's strengths
- Realistic partnerships for this objective
- Why each partner type is needed for success

Format as JSON with:
- strategicObjective (restate showing understanding)
- ecosystemSummary (2-3 sentences explaining the ecosystem design)
- partners array with 6 partners, each having type, entity (realistic for region), rationale (specific to objective)

Ensure the ecosystem design shows deep understanding of the regional context and objective requirements.`;
        break;

      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const responseText = completion.choices[0].message.content;

    // Try to parse the AI response as JSON
    try {
      responseStructure = JSON.parse(responseText);
    } catch (parseError) {
      // If AI doesn't return valid JSON, create a structured response
      console.error('AI response parsing error:', parseError);
      responseStructure = {
        error: 'AI response format issue',
        rawResponse: responseText.substring(0, 500) + '...',
        fallback: true
      };
    }

    // Return the AI-generated response
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

// Helper function to analyze objective and determine relevant indicators
async function analyzeObjectiveForIndicators(objective, region) {
  const prompt = `Analyze this business objective and region to determine the most relevant economic indicators for decision-making.

OBJECTIVE: "${objective}"
REGION: ${region}

Based on this objective, identify the 6-8 most important economic indicators that would be critical for evaluating this opportunity. Consider:
- Sector-specific metrics (manufacturing, tech, services, etc.)
- Risk factors relevant to the objective
- Competitive advantages to assess
- Growth potential indicators
- Operational feasibility metrics

Return a JSON array of indicator objects, each with:
- name: The indicator name
- code: World Bank/OECD indicator code if available
- relevance: Why this matters for the objective (1-2 sentences)
- priority: "high", "medium", or "low"

Focus on indicators that would actually influence the decision to pursue this objective in this region.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1500,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;

    // Try to parse as JSON, fallback to default indicators if parsing fails
    try {
      return JSON.parse(response);
    } catch (parseError) {
      console.error('Objective analysis parsing error:', parseError);
      return getDefaultIndicators(objective);
    }
  } catch (error) {
    console.error('Objective analysis error:', error);
    return getDefaultIndicators(objective);
  }
}

// Default indicators based on objective keywords
function getDefaultIndicators(objective) {
  const obj = objective.toLowerCase();

  if (obj.includes('manufactur') || obj.includes('production') || obj.includes('factory')) {
    return [
      { name: "GDP per capita", code: "NY.GDP.PCAP.CD", relevance: "Indicates workforce productivity and cost competitiveness", priority: "high" },
      { name: "Labor force participation", code: "SL.TLF.ACTI.ZS", relevance: "Shows available workforce for manufacturing operations", priority: "high" },
      { name: "Infrastructure quality", code: "IQ.WEF.PORT.XQ", relevance: "Critical for manufacturing supply chain efficiency", priority: "high" },
      { name: "Electricity access", code: "EG.ELC.ACCS.ZS", relevance: "Essential for industrial operations", priority: "high" },
      { name: "Trade logistics performance", code: "LP.LPI.LOGS.XQ", relevance: "Affects export competitiveness", priority: "medium" },
      { name: "Business environment", code: "IC.BUS.EASE.XQ", relevance: "Ease of setting up manufacturing operations", priority: "high" }
    ];
  } else if (obj.includes('technology') || obj.includes('innovation') || obj.includes('startup')) {
    return [
      { name: "GDP per capita", code: "NY.GDP.PCAP.CD", relevance: "Indicates market purchasing power for tech products", priority: "high" },
      { name: "Internet penetration", code: "IT.NET.USER.ZS", relevance: "Critical for technology adoption and digital services", priority: "high" },
      { name: "Education expenditure", code: "SE.XPD.TOTL.GD.ZS", relevance: "Shows investment in human capital for tech workforce", priority: "high" },
      { name: "R&D expenditure", code: "GB.XPD.RSDV.GD.ZS", relevance: "Indicates innovation ecosystem strength", priority: "high" },
      { name: "Mobile subscriptions", code: "IT.CEL.SETS.P2", relevance: "Technology infrastructure and market size", priority: "medium" },
      { name: "Business environment", code: "IC.BUS.EASE.XQ", relevance: "Ease of establishing tech companies", priority: "high" }
    ];
  } else {
    // General business indicators
    return [
      { name: "GDP growth", code: "NY.GDP.MKTP.KD.ZG", relevance: "Overall economic momentum and market potential", priority: "high" },
      { name: "GDP per capita", code: "NY.GDP.PCAP.CD", relevance: "Market purchasing power and cost structure", priority: "high" },
      { name: "Inflation rate", code: "FP.CPI.TOTL.ZG", relevance: "Economic stability and cost predictability", priority: "medium" },
      { name: "FDI inflows", code: "BX.KLT.DINV.WD.GD.ZS", relevance: "Foreign investment attractiveness", priority: "medium" },
      { name: "Business environment", code: "IC.BUS.EASE.XQ", relevance: "Ease of doing business and regulatory framework", priority: "high" },
      { name: "Infrastructure quality", code: "IQ.WEF.OVRL.XQ", relevance: "Overall infrastructure supporting business operations", priority: "high" }
    ];
  }
}

// Enhanced economic data endpoint with contextual analysis
app.get('/api/economic-data', async (req, res) => {
  try {
    const { country, objective } = req.query;
    const codes = countryCodes[country];

    if (!codes) {
      return res.status(400).json({ error: 'Country not supported' });
    }

    // Analyze objective to determine relevant indicators
    const relevantIndicators = objective ?
      await analyzeObjectiveForIndicators(objective, country) :
      getDefaultIndicators('general business');

    // Fetch data for relevant indicators
    const dataPromises = relevantIndicators.map(async (indicator) => {
      let value = null;

      // Try World Bank first
      if (indicator.code) {
        value = await fetchWorldBankData(codes.wb, indicator.code);
      }

      // Try IMF if WB fails
      if (!value && indicator.code) {
        value = await fetchIMFData(codes.imf, indicator.name.toLowerCase().replace(/\s+/g, ''));
      }

      // Try OECD if others fail
      if (!value && indicator.code) {
        value = await fetchOECDData(codes.oecd, indicator.code);
      }

      return {
        name: indicator.name,
        value: value || { value: 'Data not available', year: 'N/A' },
        relevance: indicator.relevance,
        priority: indicator.priority
      };
    });

    const economicData = await Promise.all(dataPromises);

    // Add regional context comparison
    const regionalContext = await getRegionalComparison(country, relevantIndicators);

    res.json({
      country: country,
      objective: objective || 'General analysis',
      indicators: economicData,
      regionalContext: regionalContext,
      analysisDate: new Date().toISOString()
    });

  } catch (error) {
    console.error('Economic data error:', error);
    res.status(500).json({ error: 'Failed to fetch economic data' });
  }
});

// Helper function for regional comparisons
async function getRegionalComparison(country, indicators) {
  // This would compare the country to regional averages
  // For now, return a placeholder structure
  return {
    region: getRegionForCountry(country),
    comparison: "Regional comparison data would be calculated here based on similar countries"
  };
}

function getRegionForCountry(country) {
  const regions = {
    "Israel": "Middle East",
    "Singapore": "Southeast Asia",
    "Netherlands": "Europe",
    "UAE": "Middle East",
    "Philippines": "Southeast Asia"
  };
  return regions[country] || "Global";
}

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

    const prompt = `Given this original objective: "${question}"

And this economic context: "${answer}"

Please refine and improve the objective to be more specific, actionable, and aligned with the economic realities. Make it more strategic and impactful.

Return only the refined objective text.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
    });

    const refinedObjective = completion.choices[0].message.content;

    res.json({ refinedObjective: refinedObjective.trim() });
  } catch (error) {
    console.error('Refine objective error:', error);
    res.status(500).json({ error: 'Failed to refine objective' });
  }
});

// Live opportunities endpoint with enhanced data
app.get('/api/opportunities', async (req, res) => {
  try {
    // Enhanced mock opportunities data with more comprehensive information
    const mockOpportunities = {
      feed: [
        {
          id: "1",
          timestamp: new Date().toISOString(),
          type: "opportunity",
          content: {
            project_name: "Smart City Infrastructure Development",
            country: "Philippines",
            sector: "Technology",
            value: "$500M",
            summary: "Major smart city development project in Metro Manila focusing on IoT infrastructure, digital transformation, and sustainable urban planning",
            source_url: "https://www.dti.gov.ph/business-opportunities",
            ai_feasibility_score: 85,
            ai_risk_assessment: "Low risk, high reward potential",
            timeline: "24-36 months",
            partnership_type: "Public-Private Partnership",
            key_requirements: ["IoT expertise", "Smart infrastructure", "Local partnerships"],
            contact_info: "Department of Information and Communications Technology"
          }
        },
        {
          id: "2",
          timestamp: new Date().toISOString(),
          type: "opportunity",
          content: {
            project_name: "Renewable Energy Grid Expansion",
            country: "Philippines",
            sector: "Energy",
            value: "$750M",
            summary: "Large-scale renewable energy infrastructure project including solar, wind, and hydroelectric power generation facilities",
            source_url: "https://www.doe.gov.ph/renewable-energy",
            ai_feasibility_score: 92,
            ai_risk_assessment: "Medium risk, excellent long-term potential",
            timeline: "36-48 months",
            partnership_type: "Joint Venture",
            key_requirements: ["Renewable energy technology", "Grid infrastructure", "Environmental compliance"],
            contact_info: "Department of Energy - Renewable Energy Division"
          }
        },
        {
          id: "3",
          timestamp: new Date().toISOString(),
          type: "news",
          content: {
            headline: "Tech Investment Boom in Southeast Asia Accelerates",
            summary: "Record-breaking $12B investment in technology sector across Southeast Asia, with Philippines capturing significant share through digital transformation initiatives",
            source: "Business Intelligence Asia",
            link: "https://www.bizintelasia.com/tech-investment-2024",
            region: "Southeast Asia",
            impact_score: 88,
            relevant_sectors: ["Technology", "Digital Services", "E-commerce"]
          }
        },
        {
          id: "4",
          timestamp: new Date().toISOString(),
          type: "opportunity",
          content: {
            project_name: "Advanced Manufacturing Hub",
            country: "Singapore",
            sector: "Manufacturing",
            value: "$300M",
            summary: "State-of-the-art manufacturing facility specializing in electronics, semiconductors, and precision engineering",
            source_url: "https://www.edb.gov.sg/business-opportunities",
            ai_feasibility_score: 78,
            ai_risk_assessment: "Low risk, stable returns",
            timeline: "18-24 months",
            partnership_type: "Technology Transfer Agreement",
            key_requirements: ["Advanced manufacturing", "Quality control systems", "Supply chain expertise"],
            contact_info: "Economic Development Board - Manufacturing Division"
          }
        },
        {
          id: "5",
          timestamp: new Date().toISOString(),
          type: "news",
          content: {
            headline: "ASEAN Economic Integration Deepens Trade Opportunities",
            summary: "New ASEAN trade agreements create unprecedented market access opportunities for foreign investors in manufacturing and services sectors",
            source: "ASEAN Business Review",
            link: "https://www.aseanbizreview.com/trade-integration-2024",
            region: "ASEAN",
            impact_score: 95,
            relevant_sectors: ["Manufacturing", "Services", "Logistics", "Technology"]
          }
        }
      ],
      metadata: {
        total_opportunities: 3,
        total_news: 2,
        last_updated: new Date().toISOString(),
        regions_covered: ["Philippines", "Singapore", "ASEAN"],
        sectors_covered: ["Technology", "Energy", "Manufacturing", "Services"]
      }
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

// Analytics and metrics endpoint
app.get('/api/analytics', async (req, res) => {
  try {
    // Mock analytics data - in production, integrate with real analytics
    const analytics = {
      system_metrics: {
        total_reports_generated: 1247,
        active_users: 89,
        average_session_time: "24m 32s",
        top_regions: ["Philippines", "Singapore", "Malaysia"],
        top_sectors: ["Technology", "Manufacturing", "Energy"]
      },
      user_journey: {
        average_completion_rate: 78.5,
        most_used_features: ["Report Generation", "AI Analysis", "Economic Data"],
        drop_off_points: ["Step 6", "Step 8"],
        user_satisfaction: 4.2
      },
      ai_performance: {
        total_interactions: 3456,
        average_response_time: "2.3s",
        success_rate: 94.7,
        most_queried_topics: ["Market Analysis", "Partner Identification", "Risk Assessment"]
      },
      last_updated: new Date().toISOString()
    };

    res.json(analytics);
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Report templates endpoint
app.get('/api/templates', async (req, res) => {
  try {
    const templates = {
      industry_templates: [
        {
          id: "manufacturing",
          name: "Advanced Manufacturing",
          description: "Comprehensive template for manufacturing sector analysis",
          target_industries: ["Manufacturing", "Industrial", "Supply Chain"],
          recommended_tiers: ["Operational Intelligence", "Financial Intelligence", "Risk Intelligence"],
          ai_personas: ["Supply Chain Analyst", "Infrastructure Planner", "Regional Economist"]
        },
        {
          id: "technology",
          name: "Technology & Innovation",
          description: "Template for technology sector and digital transformation",
          target_industries: ["Technology", "Software", "Digital Services"],
          recommended_tiers: ["Innovation Intelligence", "Market Intelligence", "Strategic Intelligence"],
          ai_personas: ["Venture Capitalist", "Geopolitical Strategist", "ESG Analyst"]
        },
        {
          id: "energy",
          name: "Renewable Energy",
          description: "Specialized template for clean energy and sustainability",
          target_industries: ["Energy", "Renewable Energy", "Utilities"],
          recommended_tiers: ["Strategic Intelligence", "Risk Intelligence", "Innovation Intelligence"],
          ai_personas: ["ESG Analyst", "Infrastructure Planner", "Regional Economist"]
        },
        {
          id: "healthcare",
          name: "Healthcare & Life Sciences",
          description: "Template for healthcare sector analysis and partnerships",
          target_industries: ["Healthcare", "Pharmaceuticals", "Medical Technology"],
          recommended_tiers: ["Innovation Intelligence", "Regulatory Intelligence", "Market Intelligence"],
          ai_personas: ["ESG Analyst", "Workforce Development Specialist", "Regional Economist"]
        }
      ],
      regional_templates: [
        {
          id: "southeast_asia",
          name: "Southeast Asia Expansion",
          description: "Optimized for ASEAN market entry and regional expansion",
          target_regions: ["Philippines", "Singapore", "Malaysia", "Indonesia", "Thailand"],
          focus_areas: ["ASEAN Integration", "Digital Economy", "Sustainable Development"]
        },
        {
          id: "middle_east",
          name: "Middle East Markets",
          description: "Template for Middle East business development",
          target_regions: ["UAE", "Saudi Arabia", "Israel"],
          focus_areas: ["Digital Transformation", "Renewable Energy", "Technology Innovation"]
        }
      ]
    };

    res.json(templates);
  } catch (error) {
    console.error('Templates error:', error);
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 BWGA Nexus AI Backend Server v2.0 - FULLY ENHANCED`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🤖 AI Status: ${process.env.OPENAI_API_KEY ? '✅ Configured' : '❌ Missing API Key'}`);
  console.log(`🌐 Production URL: https://bwga-nexus-ai-server.vercel.app`);
  console.log(`📈 System Status: ENHANCED & OPERATIONAL - All endpoints active`);
  console.log(`🔧 Last Updated: ${new Date().toISOString()}`);
  console.log(`📋 Features: RROI/TPT/SEAM Analysis, Streaming Reports, Economic Data, Live Opportunities, Analytics, Templates`);
  console.log(`🎯 New Capabilities: Auto-save, Analytics, Templates, Enhanced Live Feed, Keyboard Shortcuts`);
  console.log(`📊 API Endpoints: /api/report (streaming), /api/analytics, /api/templates, /api/opportunities`);
});

export default app;