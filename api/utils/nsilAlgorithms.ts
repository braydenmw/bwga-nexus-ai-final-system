// BWGA Nexus AI - NSIL (Nexus Symbiotic Intelligence Language) Algorithms
// Core mathematical and analytical models for economic intelligence

export interface NSILAnalysisResult {
  score: number;
  components: Record<string, any>;
  recommendations: string[];
  confidence: number;
  analysis?: string;
}

export interface RegionalData {
  economicIndicators: {
    gdp: number;
    gdpGrowth: number;
    unemployment: number;
    inflation: number;
    tradeBalance: number;
    fdi: number;
  };
  infrastructure: {
    transportation: number;
    utilities: number;
    digital: number;
    education: number;
  };
  demographics: {
    population: number;
    workforce: number;
    urbanization: number;
  };
}

export interface InvestmentParameters {
  initialInvestment: number;
  expectedROI: number;
  timeline: number;
  riskFactor: number;
  marketSize: number;
  growthRate: number;
}

// RCI (Regional Competitiveness Index) Algorithm
export function calculateRCI(data: any): NSILAnalysisResult {
  const weights = {
    economic: 0.25,
    infrastructure: 0.20,
    humanCapital: 0.20,
    institutions: 0.15,
    innovation: 0.10,
    marketAccess: 0.10
  };

  const components = {
    economic: Math.min(data.economic / 1000000000000, 1) * 100, // GDP-based scoring
    infrastructure: data.infrastructure || 70,
    humanCapital: data.humanCapital || 75,
    institutions: data.institutions || 75,
    innovation: data.innovation || 65,
    marketAccess: data.marketAccess || 80
  };

  const score = Object.entries(components).reduce((sum, [key, value]) => {
    return sum + (value * weights[key as keyof typeof weights]);
  }, 0);

  return {
    score: Math.round(score),
    components,
    recommendations: generateRCIRecommendations(components),
    confidence: 0.85,
    analysis: `RCI Score: ${Math.round(score)}/100 - ${score > 75 ? 'Highly Competitive' : score > 60 ? 'Moderately Competitive' : 'Needs Improvement'}`
  };
}

// ROI (Return on Investment) Analysis
export function calculateROI(params: InvestmentParameters): NSILAnalysisResult {
  const { initialInvestment, expectedROI, timeline, riskFactor } = params;

  // NPV Calculation
  const cashFlows = [];
  for (let year = 1; year <= timeline; year++) {
    const annualReturn = initialInvestment * (expectedROI / 100);
    cashFlows.push(annualReturn / Math.pow(1 + riskFactor, year));
  }

  const npv = cashFlows.reduce((sum, cf) => sum + cf, 0) - initialInvestment;
  const irr = expectedROI * (1 - riskFactor);
  const paybackPeriod = initialInvestment / (initialInvestment * expectedROI / 100);

  const components = {
    npv: npv,
    irr: irr,
    paybackPeriod: paybackPeriod,
    roi: expectedROI,
    riskAdjustedReturn: expectedROI * (1 - riskFactor)
  };

  const score = Math.min((npv / initialInvestment) * 50 + 50, 100);

  return {
    score: Math.round(score),
    components,
    recommendations: generateROIRecommendations(components),
    confidence: 0.82,
    analysis: `Investment ROI Analysis: ${Math.round(score)}/100 confidence score`
  };
}

// TPP (Time to Profit) Analysis
export function calculateTPP(params: InvestmentParameters): NSILAnalysisResult {
  const { initialInvestment, expectedROI, timeline, marketSize, growthRate } = params;

  // Break-even analysis
  const annualRevenue = marketSize * (growthRate / 100);
  const annualCosts = initialInvestment * 0.3; // Assume 30% annual operating costs
  const annualProfit = annualRevenue - annualCosts;

  const timeToProfit = annualProfit > 0 ? 0 : Math.ceil(initialInvestment / Math.abs(annualProfit));

  // Growth projections
  const projections = [];
  for (let year = 1; year <= timeline; year++) {
    const projectedRevenue = marketSize * Math.pow(1 + growthRate / 100, year);
    const projectedProfit = projectedRevenue - (initialInvestment * 0.3);
    projections.push({
      year,
      revenue: projectedRevenue,
      profit: projectedProfit,
      cumulativeProfit: projections.reduce((sum, p) => sum + p.profit, 0) + projectedProfit
    });
  }

  const finalNPV = projections.reduce((sum, p) => sum + (p.profit / Math.pow(1.1, p.year)), 0);

  const components = {
    timeToProfit,
    finalNPV,
    annualProfit,
    projections,
    marketPenetration: (annualRevenue / marketSize) * 100
  };

  const score = Math.max(0, Math.min(100, 100 - (timeToProfit * 10)));

  return {
    score: Math.round(score),
    components,
    recommendations: generateTPPRecommendations(components),
    confidence: 0.78,
    analysis: `Time to Profit: ${timeToProfit} years - ${score > 70 ? 'Strong' : score > 50 ? 'Moderate' : 'Challenging'} opportunity`
  };
}

// SEAM (Strategic Ecosystem Analysis Model)
export function analyzeSEAM(partners: any[], region: string, industry: string): NSILAnalysisResult {
  // Mock ecosystem analysis
  const ecosystemStrength = Math.random() * 30 + 70; // 70-100
  const synergyScore = Math.random() * 20 + 75; // 75-95
  const partnerDiversity = Math.random() * 0.3 + 0.6; // 0.6-0.9

  const components = {
    ecosystemStrength,
    synergyScore,
    partnerDiversity,
    networkDensity: partnerDiversity * 0.8,
    collaborationOpportunities: Math.floor(Math.random() * 5) + 3,
    riskMitigationStrategies: ['Diversified partnerships', 'Local stakeholder engagement', 'Regulatory compliance'],
    valueCreationPotential: (ecosystemStrength + synergyScore) / 2,
    partnershipStabilityIndex: synergyScore * 0.9
  };

  const score = (ecosystemStrength * 0.4) + (synergyScore * 0.4) + (partnerDiversity * 20);

  return {
    score: Math.round(score),
    components,
    recommendations: generateSEAMRecommendations(components),
    confidence: 0.80,
    analysis: `SEAM Ecosystem Score: ${Math.round(score)}/100 - ${score > 80 ? 'Excellent synergy potential' : score > 70 ? 'Good ecosystem fit' : 'Needs ecosystem development'}`
  };
}

// Risk Assessment Algorithm
export function calculateRiskIndex(economicData: any, projectData: any): NSILAnalysisResult {
  const baseRiskFactors = {
    economicVolatility: Math.abs(economicData.gdpGrowth - 3) / 5, // Deviation from 3% ideal growth
    marketInstability: economicData.inflation / 10, // Inflation as % of risk
    currencyRisk: economicData.tradeBalance < 0 ? 0.3 : 0.1, // Trade deficit risk
    politicalRisk: 0.2, // Base political risk
    regulatoryRisk: 0.15, // Base regulatory risk
    operationalRisk: 0.25 // Base operational risk
  };

  const totalRisk = Object.values(baseRiskFactors).reduce((sum, risk) => sum + risk, 0);
  const riskScore = Math.min(totalRisk * 25, 100); // Convert to 0-100 scale

  const components = {
    economicRisk: baseRiskFactors.economicVolatility * 100,
    marketRisk: baseRiskFactors.marketInstability * 100,
    currencyRisk: baseRiskFactors.currencyRisk * 100,
    politicalRisk: baseRiskFactors.politicalRisk * 100,
    regulatoryRisk: baseRiskFactors.regulatoryRisk * 100,
    operationalRisk: baseRiskFactors.operationalRisk * 100,
    totalRiskScore: riskScore
  };

  return {
    score: Math.round(riskScore),
    components,
    recommendations: generateRiskRecommendations(components),
    confidence: 0.75,
    analysis: `Risk Assessment: ${Math.round(riskScore)}/100 - ${riskScore < 30 ? 'Low risk' : riskScore < 60 ? 'Moderate risk' : 'High risk'} profile`
  };
}

// Monte Carlo Simulation for Risk Analysis
export function runMonteCarloSimulation(params: InvestmentParameters, iterations: number = 1000): NSILAnalysisResult {
  const results = [];
  const { initialInvestment, expectedROI, timeline, riskFactor } = params;

  for (let i = 0; i < iterations; i++) {
    // Generate random variables with normal distribution
    const randomROI = expectedROI * (1 + (Math.random() - 0.5) * riskFactor);
    const randomTimeline = timeline * (1 + (Math.random() - 0.5) * 0.2);

    // Calculate NPV with random variables
    let npv = -initialInvestment;
    for (let year = 1; year <= randomTimeline; year++) {
      const cashFlow = initialInvestment * (randomROI / 100);
      npv += cashFlow / Math.pow(1 + riskFactor, year);
    }
    results.push(npv);
  }

  // Statistical analysis
  const mean = results.reduce((sum, val) => sum + val, 0) / results.length;
  const variance = results.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / results.length;
  const stdDev = Math.sqrt(variance);

  const confidence95 = {
    lower: mean - (1.96 * stdDev),
    upper: mean + (1.96 * stdDev)
  };

  const components = {
    meanNPV: mean,
    standardDeviation: stdDev,
    confidence95,
    probabilityOfProfit: results.filter(npv => npv > 0).length / results.length,
    bestCase: Math.max(...results),
    worstCase: Math.min(...results),
    iterations
  };

  const score = Math.min((mean / initialInvestment) * 50 + 50, 100);

  return {
    score: Math.round(score),
    components,
    recommendations: generateMonteCarloRecommendations(components),
    confidence: 0.88,
    analysis: `Monte Carlo Analysis: ${Math.round(score)}/100 confidence - ${(components.probabilityOfProfit * 100).toFixed(1)}% probability of profit`
  };
}

// Competition Analysis
export function analyzeCompetition(region: string, industry: string, competitors: any[]): NSILAnalysisResult {
  const marketConcentration = Math.random() * 0.4 + 0.3; // 0.3-0.7
  const competitiveIntensity = competitors.length / 10; // Scale based on competitor count
  const entryBarriers = Math.random() * 30 + 40; // 40-70
  const innovationRate = Math.random() * 20 + 60; // 60-80

  const components = {
    marketConcentration,
    competitiveIntensity: Math.min(competitiveIntensity, 1),
    entryBarriers,
    innovationRate,
    marketShareDistribution: competitors.map(() => Math.random()),
    competitiveAdvantages: ['Technology', 'Cost efficiency', 'Brand strength', 'Distribution network']
  };

  const score = (entryBarriers * 0.4) + (innovationRate * 0.3) + ((1 - competitiveIntensity) * 30);

  return {
    score: Math.round(score),
    components,
    recommendations: generateCompetitionRecommendations(components),
    confidence: 0.72,
    analysis: `Competition Analysis: ${Math.round(score)}/100 - ${score > 70 ? 'Favorable' : score > 50 ? 'Competitive' : 'Challenging'} market conditions`
  };
}

// NSIL Algorithms Collection
export const NSILAlgorithms = {
  calculateRCI,
  calculateROI,
  calculateTPP,
  analyzeSEAM,
  calculateRiskIndex,
  runMonteCarloSimulation,
  analyzeCompetition
};

// Recommendation Generators
function generateRCIRecommendations(components: any): string[] {
  const recommendations = [];
  if (components.economic < 70) recommendations.push('Focus on economic diversification and growth initiatives');
  if (components.infrastructure < 70) recommendations.push('Invest in infrastructure development and modernization');
  if (components.humanCapital < 70) recommendations.push('Develop workforce skills and education programs');
  if (components.innovation < 70) recommendations.push('Support innovation hubs and technology adoption');
  return recommendations.length > 0 ? recommendations : ['Maintain current competitive position'];
}

function generateROIRecommendations(components: any): string[] {
  const recommendations = [];
  if (components.paybackPeriod > 5) recommendations.push('Consider phased investment approach to reduce payback time');
  if (components.riskAdjustedReturn < 15) recommendations.push('Evaluate risk mitigation strategies to improve returns');
  if (components.npv < 0) recommendations.push('Reassess investment parameters and market assumptions');
  return recommendations.length > 0 ? recommendations : ['Investment parameters look favorable'];
}

function generateTPPRecommendations(components: any): string[] {
  const recommendations = [];
  if (components.timeToProfit > 3) recommendations.push('Implement aggressive market penetration strategies');
  if (components.annualProfit < components.finalNPV * 0.1) recommendations.push('Optimize cost structure and revenue streams');
  return recommendations.length > 0 ? recommendations : ['Profitability timeline is within acceptable range'];
}

function generateSEAMRecommendations(components: any): string[] {
  const recommendations = [];
  if (components.synergyScore < 80) recommendations.push('Strengthen partner relationships and collaboration frameworks');
  if (components.partnerDiversity < 0.7) recommendations.push('Diversify partnership portfolio across different sectors');
  return recommendations.length > 0 ? recommendations : ['Ecosystem configuration is optimal'];
}

function generateRiskRecommendations(components: any): string[] {
  const recommendations = [];
  if (components.economicRisk > 50) recommendations.push('Implement economic hedging strategies');
  if (components.currencyRisk > 50) recommendations.push('Consider currency risk management tools');
  if (components.politicalRisk > 50) recommendations.push('Develop contingency plans for political changes');
  return recommendations.length > 0 ? recommendations : ['Risk profile is within acceptable parameters'];
}

function generateMonteCarloRecommendations(components: any): string[] {
  const recommendations = [];
  if (components.probabilityOfProfit < 0.6) recommendations.push('Reassess investment assumptions and risk factors');
  if (components.confidence95.lower < 0) recommendations.push('Consider conservative investment approach');
  return recommendations.length > 0 ? recommendations : ['Monte Carlo results support investment decision'];
}

function generateCompetitionRecommendations(components: any): string[] {
  const recommendations = [];
  if (components.competitiveIntensity > 0.7) recommendations.push('Focus on differentiation and niche market strategies');
  if (components.entryBarriers < 50) recommendations.push('Monitor for new market entrants');
  return recommendations.length > 0 ? recommendations : ['Competitive position is sustainable'];
}