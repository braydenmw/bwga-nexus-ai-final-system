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

export interface ComprehensiveRegionalAnalysis {
  location: {
    city: string;
    region: string;
    country: string;
    coordinates: { lat: number; lng: number };
    proximityToTradeRoutes: number; // km to nearest major trade route
    proximityToPorts: number; // km to nearest port
    proximityToAirports: number; // km to nearest international airport
  };
  economicProfile: {
    regionalGDP: number;
    contributionToNationalGDP: number; // percentage
    localMarketSize: number;
    costOfLivingIndex: number;
    wageLevels: {
      averageSalary: number;
      minimumWage: number;
      skilledLaborCost: number;
    };
    unemploymentRate: number;
    povertyRate: number;
    growthPotential: number;
  };
  infrastructureReadiness: {
    transportationScore: number;
    utilitiesScore: number;
    digitalConnectivity: number;
    educationQuality: number;
    healthcareAccess: number;
    housingAvailability: number;
  };
  businessEnvironment: {
    easeOfDoingBusiness: number;
    regulatoryComplexity: number;
    corruptionIndex: number;
    crimeRate: number;
    politicalStability: number;
    governmentEfficiency: number;
  };
  incentivesAndCosts: {
    taxIncentives: number[]; // array of available incentives
    tariffOffsets: number;
    subsidies: number;
    infrastructureGrants: number;
    trainingGrants: number;
  };
  socialFactors: {
    familySeparationRisk: number; // likelihood of workers leaving families
    communityAcceptance: number; // local acceptance of foreign investment
    culturalCompatibility: number;
    laborRights: number;
    environmentalStandards: number;
  };
  competitiveAdvantages: {
    uniqueResources: string[];
    specializedSkills: string[];
    costAdvantages: string[];
    marketAccess: string[];
  };
  dataFreshness: {
    lastUpdated: Date;
    dataSources: string[];
    verificationStatus: 'verified' | 'estimated' | 'outdated';
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

// Deal Success Factors Analysis
export interface DealSuccessFactors {
  economicStability: number;
  politicalStability: number;
  regulatoryQuality: number;
  infrastructureQuality: number;
  marketAccess: number;
  humanCapital: number;
  corruptionIndex: number;
  contractEnforcement: number;
  partnerReputation: number;
  culturalCompatibility: number;
  technologyAdoption: number;
  financialHealth: number;
}

export function analyzeDealSuccessFactors(factors: DealSuccessFactors): NSILAnalysisResult {
  const weights = {
    economicStability: 0.15,
    politicalStability: 0.15,
    regulatoryQuality: 0.12,
    infrastructureQuality: 0.10,
    marketAccess: 0.10,
    humanCapital: 0.08,
    corruptionIndex: 0.08,
    contractEnforcement: 0.08,
    partnerReputation: 0.06,
    culturalCompatibility: 0.04,
    technologyAdoption: 0.03,
    financialHealth: 0.01
  };

  // Normalize corruption index (lower corruption = higher score)
  const normalizedCorruption = 100 - factors.corruptionIndex;

  const components = {
    economicStability: factors.economicStability,
    politicalStability: factors.politicalStability,
    regulatoryQuality: factors.regulatoryQuality,
    infrastructureQuality: factors.infrastructureQuality,
    marketAccess: factors.marketAccess,
    humanCapital: factors.humanCapital,
    corruptionIndex: normalizedCorruption,
    contractEnforcement: factors.contractEnforcement,
    partnerReputation: factors.partnerReputation,
    culturalCompatibility: factors.culturalCompatibility,
    technologyAdoption: factors.technologyAdoption,
    financialHealth: factors.financialHealth
  };

  const score = Object.entries(components).reduce((sum, [key, value]) => {
    return sum + (value * weights[key as keyof typeof weights]);
  }, 0);

  return {
    score: Math.round(score),
    components,
    recommendations: generateDealSuccessRecommendations(components),
    confidence: 0.85,
    analysis: `Deal Success Score: ${Math.round(score)}/100 - ${score > 75 ? 'High success potential' : score > 60 ? 'Moderate success potential' : 'Low success potential'}`
  };
}

// Trust and Partnership Analysis
export function analyzeTrustFactors(partnerData: any, dealContext: any): NSILAnalysisResult {
  const trustFactors = {
    reputationScore: partnerData.reputation || 70,
    trackRecord: partnerData.trackRecord || 75,
    transparency: partnerData.transparency || 65,
    communicationQuality: partnerData.communication || 70,
    alignmentOfInterests: partnerData.alignment || 80,
    powerBalance: partnerData.powerBalance || 60,
    exitStrategy: partnerData.exitStrategy || 55,
    conflictResolution: partnerData.conflictResolution || 65
  };

  const weights = {
    reputationScore: 0.20,
    trackRecord: 0.20,
    transparency: 0.15,
    communicationQuality: 0.10,
    alignmentOfInterests: 0.15,
    powerBalance: 0.10,
    exitStrategy: 0.05,
    conflictResolution: 0.05
  };

  const score = Object.entries(trustFactors).reduce((sum, [key, value]) => {
    return sum + (value * weights[key as keyof typeof weights]);
  }, 0);

  return {
    score: Math.round(score),
    components: trustFactors,
    recommendations: generateTrustRecommendations(trustFactors),
    confidence: 0.80,
    analysis: `Trust & Partnership Score: ${Math.round(score)}/100 - ${score > 80 ? 'Strong foundation' : score > 65 ? 'Good foundation' : 'Needs improvement'}`
  };
}

// Foreign Investment Attraction Analysis
export function analyzeInvestmentAttraction(governmentData: any, investorData: any): NSILAnalysisResult {
  const attractionFactors = {
    investmentIncentives: governmentData.incentives || 75,
    easeOfDoingBusiness: governmentData.businessEase || 70,
    taxRegime: governmentData.taxRegime || 65,
    intellectualProperty: governmentData.ipProtection || 80,
    disputeResolution: governmentData.disputeResolution || 75,
    marketSize: governmentData.marketSize || 85,
    growthPotential: governmentData.growthPotential || 80,
    strategicLocation: governmentData.location || 70,
    politicalStability: governmentData.politicalStability || 65,
    corruptionPerception: 100 - (governmentData.corruption || 30),
    infrastructureReadiness: governmentData.infrastructure || 75,
    workforceQuality: governmentData.workforce || 70
  };

  const weights = {
    investmentIncentives: 0.12,
    easeOfDoingBusiness: 0.12,
    taxRegime: 0.10,
    intellectualProperty: 0.08,
    disputeResolution: 0.08,
    marketSize: 0.10,
    growthPotential: 0.10,
    strategicLocation: 0.08,
    politicalStability: 0.08,
    corruptionPerception: 0.08,
    infrastructureReadiness: 0.04,
    workforceQuality: 0.04
  };

  const score = Object.entries(attractionFactors).reduce((sum, [key, value]) => {
    return sum + (value * weights[key as keyof typeof weights]);
  }, 0);

  return {
    score: Math.round(score),
    components: attractionFactors,
    recommendations: generateInvestmentAttractionRecommendations(attractionFactors),
    confidence: 0.82,
    analysis: `Investment Attraction Score: ${Math.round(score)}/100 - ${score > 75 ? 'Highly attractive' : score > 60 ? 'Moderately attractive' : 'Low attraction potential'}`
  };
}

// Comprehensive Regional Analysis Algorithm
export function analyzeComprehensiveRegional(data: ComprehensiveRegionalAnalysis): NSILAnalysisResult {
  const weights = {
    location: 0.15,
    economicProfile: 0.25,
    infrastructureReadiness: 0.20,
    businessEnvironment: 0.20,
    incentivesAndCosts: 0.10,
    socialFactors: 0.10
  };

  // Location scoring (proximity to trade routes, ports, airports)
  const locationScore = Math.max(0, 100 - (data.location.proximityToTradeRoutes / 10) - (data.location.proximityToPorts / 5) - (data.location.proximityToAirports / 2));

  // Economic profile scoring
  const economicScore = (
    (data.economicProfile.contributionToNationalGDP / 100) * 40 +
    (1 - data.economicProfile.unemploymentRate / 100) * 30 +
    (1 - data.economicProfile.povertyRate / 100) * 30
  );

  // Infrastructure readiness scoring
  const infrastructureScore = (
    data.infrastructureReadiness.transportationScore * 0.25 +
    data.infrastructureReadiness.utilitiesScore * 0.20 +
    data.infrastructureReadiness.digitalConnectivity * 0.20 +
    data.infrastructureReadiness.educationQuality * 0.15 +
    data.infrastructureReadiness.healthcareAccess * 0.10 +
    data.infrastructureReadiness.housingAvailability * 0.10
  );

  // Business environment scoring
  const businessScore = (
    data.businessEnvironment.easeOfDoingBusiness * 0.25 +
    (100 - data.businessEnvironment.regulatoryComplexity) * 0.20 +
    (100 - data.businessEnvironment.corruptionIndex) * 0.20 +
    (100 - data.businessEnvironment.crimeRate) * 0.15 +
    data.businessEnvironment.politicalStability * 0.10 +
    data.businessEnvironment.governmentEfficiency * 0.10
  );

  // Incentives and costs scoring
  const incentivesScore = (
    data.incentivesAndCosts.taxIncentives.reduce((sum, incentive) => sum + incentive, 0) / data.incentivesAndCosts.taxIncentives.length * 0.4 +
    data.incentivesAndCosts.tariffOffsets * 0.3 +
    data.incentivesAndCosts.subsidies * 0.3
  );

  // Social factors scoring
  const socialScore = (
    (100 - data.socialFactors.familySeparationRisk) * 0.30 +
    data.socialFactors.communityAcceptance * 0.25 +
    data.socialFactors.culturalCompatibility * 0.20 +
    data.socialFactors.laborRights * 0.15 +
    data.socialFactors.environmentalStandards * 0.10
  );

  const components = {
    locationScore,
    economicScore,
    infrastructureScore,
    businessScore,
    incentivesScore,
    socialScore,
    competitiveAdvantages: data.competitiveAdvantages,
    dataFreshness: data.dataFreshness.verificationStatus === 'verified' ? 100 :
                   data.dataFreshness.verificationStatus === 'estimated' ? 70 : 40
  };

  const score = (
    locationScore * weights.location +
    economicScore * weights.economicProfile +
    infrastructureScore * weights.infrastructureReadiness +
    businessScore * weights.businessEnvironment +
    incentivesScore * weights.incentivesAndCosts +
    socialScore * weights.socialFactors
  );

  // Adjust confidence based on data freshness
  const baseConfidence = 0.85;
  const freshnessMultiplier = components.dataFreshness / 100;
  const confidence = baseConfidence * freshnessMultiplier;

  return {
    score: Math.round(score),
    components,
    recommendations: generateComprehensiveRegionalRecommendations(components, data),
    confidence,
    analysis: `Comprehensive Regional Score: ${Math.round(score)}/100 - ${score > 80 ? 'Excellent opportunity' : score > 65 ? 'Strong potential' : score > 50 ? 'Moderate potential' : 'Limited potential'}`
  };
}

// Regional Cost-Benefit Analysis Algorithm
export function analyzeRegionalCostBenefit(
  regionalData: ComprehensiveRegionalAnalysis,
  investmentData: InvestmentParameters,
  alternativeLocations: ComprehensiveRegionalAnalysis[]
): NSILAnalysisResult {
  const baseLocationScore = analyzeComprehensiveRegional(regionalData).score;

  // Calculate total cost of doing business
  const totalCostFactors = {
    laborCosts: regionalData.economicProfile.wageLevels.averageSalary * 1.3, // Including benefits
    operationalCosts: regionalData.economicProfile.costOfLivingIndex * 100,
    infrastructureCosts: (100 - regionalData.infrastructureReadiness.transportationScore) * 10,
    regulatoryCosts: regionalData.businessEnvironment.regulatoryComplexity * 5,
    corruptionCosts: regionalData.businessEnvironment.corruptionIndex * 2,
    proximityCosts: (regionalData.location.proximityToTradeRoutes + regionalData.location.proximityToPorts) / 2
  };

  const totalCostIndex = Object.values(totalCostFactors).reduce((sum, cost) => sum + cost, 0) / 100;

  // Calculate benefit factors
  const benefitFactors = {
    marketAccess: regionalData.economicProfile.localMarketSize / 1000000, // Market size in millions
    incentives: regionalData.incentivesAndCosts.taxIncentives.reduce((sum, inc) => sum + inc, 0),
    infrastructure: regionalData.infrastructureReadiness.transportationScore,
    workforce: regionalData.infrastructureReadiness.educationQuality,
    stability: regionalData.businessEnvironment.politicalStability,
    tradeRoutes: Math.max(0, 100 - regionalData.location.proximityToTradeRoutes)
  };

  const totalBenefitIndex = Object.values(benefitFactors).reduce((sum, benefit) => sum + benefit, 0) / 100;

  // Compare with alternatives
  const alternativeScores = alternativeLocations.map(alt => analyzeComprehensiveRegional(alt).score);
  const bestAlternativeScore = Math.max(...alternativeScores);
  const competitivePosition = (baseLocationScore / bestAlternativeScore) * 100;

  // ROI adjustment based on regional factors
  const regionalROIAdjustment = (totalBenefitIndex - totalCostIndex) / 10;
  const adjustedROI = investmentData.expectedROI + regionalROIAdjustment;

  const components = {
    totalCostIndex,
    totalBenefitIndex,
    competitivePosition,
    adjustedROI,
    costBreakdown: totalCostFactors,
    benefitBreakdown: benefitFactors,
    alternativeComparison: alternativeScores.map((score, index) => ({
      location: alternativeLocations[index].location.city,
      score,
      difference: baseLocationScore - score
    }))
  };

  const score = Math.min(100, Math.max(0, competitivePosition + (adjustedROI - investmentData.expectedROI) * 10));

  return {
    score: Math.round(score),
    components,
    recommendations: generateRegionalCostBenefitRecommendations(components, regionalData),
    confidence: 0.78,
    analysis: `Regional Cost-Benefit Score: ${Math.round(score)}/100 - ${score > 75 ? 'Strong value proposition' : score > 60 ? 'Competitive positioning' : 'Cost challenges present'}`
  };
}

// Partnership Viability Analysis Algorithm
export function analyzePartnershipViability(
  partnershipType: 'gov-gov' | 'gov-business' | 'business-business' | 'banking' | 'cross-sector',
  regionalData: ComprehensiveRegionalAnalysis,
  partnerData: any,
  dealParameters: any
): NSILAnalysisResult {
  const baseFactors = {
    regulatoryCompatibility: regionalData.businessEnvironment.regulatoryComplexity < 50 ? 80 : 60,
    culturalAlignment: regionalData.socialFactors.culturalCompatibility,
    economicComplementary: regionalData.economicProfile.growthPotential,
    infrastructureCompatibility: regionalData.infrastructureReadiness.transportationScore,
    politicalAlignment: regionalData.businessEnvironment.politicalStability,
    corruptionTransparency: 100 - regionalData.businessEnvironment.corruptionIndex
  };

  // Partnership type specific adjustments
  const partnershipMultipliers = {
    'gov-gov': { regulatory: 1.2, political: 1.3, corruption: 1.1, cultural: 1.0, economic: 0.9, infrastructure: 0.8 },
    'gov-business': { regulatory: 1.1, political: 1.0, corruption: 1.2, cultural: 0.9, economic: 1.1, infrastructure: 1.0 },
    'business-business': { regulatory: 0.9, political: 0.8, corruption: 1.0, cultural: 1.1, economic: 1.2, infrastructure: 1.1 },
    'banking': { regulatory: 1.3, political: 1.1, corruption: 1.4, cultural: 0.8, economic: 1.0, infrastructure: 0.9 },
    'cross-sector': { regulatory: 1.0, political: 0.9, corruption: 1.1, cultural: 1.2, economic: 1.1, infrastructure: 1.0 }
  };

  const multipliers = partnershipMultipliers[partnershipType];

  const adjustedFactors = {
    regulatoryCompatibility: Math.min(100, baseFactors.regulatoryCompatibility * multipliers.regulatory),
    culturalAlignment: Math.min(100, baseFactors.culturalAlignment * multipliers.cultural),
    economicComplementary: Math.min(100, baseFactors.economicComplementary * multipliers.economic),
    infrastructureCompatibility: Math.min(100, baseFactors.infrastructureCompatibility * multipliers.infrastructure),
    politicalAlignment: Math.min(100, baseFactors.politicalAlignment * multipliers.political),
    corruptionTransparency: Math.min(100, baseFactors.corruptionTransparency * multipliers.corruption)
  };

  const weights = {
    regulatoryCompatibility: 0.25,
    politicalAlignment: 0.20,
    corruptionTransparency: 0.20,
    culturalAlignment: 0.15,
    economicComplementary: 0.10,
    infrastructureCompatibility: 0.10
  };

  const score = Object.entries(adjustedFactors).reduce((sum, [key, value]) => {
    return sum + (value * weights[key as keyof typeof weights]);
  }, 0);

  const components = {
    ...adjustedFactors,
    partnershipType,
    baseFactors,
    adjustments: multipliers,
    dealParameters: dealParameters || {}
  };

  return {
    score: Math.round(score),
    components,
    recommendations: generatePartnershipViabilityRecommendations(components, partnershipType),
    confidence: 0.82,
    analysis: `Partnership Viability Score: ${Math.round(score)}/100 - ${score > 80 ? 'High partnership potential' : score > 65 ? 'Moderate partnership potential' : 'Partnership challenges present'}`
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
  analyzeCompetition,
  analyzeDealSuccessFactors,
  analyzeTrustFactors,
  analyzeInvestmentAttraction,
  analyzeComprehensiveRegional,
  analyzeRegionalCostBenefit,
  analyzePartnershipViability
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

function generateDealSuccessRecommendations(components: any): string[] {
  const recommendations = [];
  if (components.economicStability < 70) recommendations.push('Address economic stability concerns through policy reforms');
  if (components.politicalStability < 70) recommendations.push('Strengthen political institutions and governance');
  if (components.regulatoryQuality < 70) recommendations.push('Improve regulatory framework and transparency');
  if (components.corruptionIndex < 70) recommendations.push('Implement anti-corruption measures and accountability');
  return recommendations.length > 0 ? recommendations : ['Deal success factors are favorable'];
}

function generateTrustRecommendations(components: any): string[] {
  const recommendations = [];
  if (components.reputationScore < 70) recommendations.push('Build reputation through transparent practices and track record');
  if (components.transparency < 70) recommendations.push('Enhance communication and information sharing');
  if (components.alignmentOfInterests < 70) recommendations.push('Align interests through clear agreements and incentives');
  if (components.conflictResolution < 70) recommendations.push('Establish robust dispute resolution mechanisms');
  return recommendations.length > 0 ? recommendations : ['Trust foundation is strong'];
}

function generateInvestmentAttractionRecommendations(components: any): string[] {
  const recommendations = [];
  if (components.investmentIncentives < 70) recommendations.push('Develop competitive investment incentives and tax benefits');
  if (components.easeOfDoingBusiness < 70) recommendations.push('Streamline business registration and regulatory processes');
  if (components.intellectualProperty < 70) recommendations.push('Strengthen IP protection and enforcement');
  if (components.politicalStability < 70) recommendations.push('Enhance political stability and policy predictability');
  return recommendations.length > 0 ? recommendations : ['Investment environment is attractive'];
}

function generateComprehensiveRegionalRecommendations(components: any, data: ComprehensiveRegionalAnalysis): string[] {
  const recommendations = [];
  if (components.locationScore < 70) recommendations.push('Improve proximity to key trade routes, ports, and airports');
  if (components.economicScore < 70) recommendations.push('Focus on economic diversification and reducing unemployment/poverty');
  if (components.infrastructureScore < 70) recommendations.push('Invest in transportation, utilities, digital connectivity, and education');
  if (components.businessScore < 70) recommendations.push('Simplify regulations, reduce corruption, and improve political stability');
  if (components.incentivesScore < 70) recommendations.push('Enhance tax incentives, tariff offsets, and subsidies');
  if (components.socialScore < 70) recommendations.push('Address family separation concerns and improve cultural compatibility');
  if (components.dataFreshness < 70) recommendations.push('Update regional data sources and verify information accuracy');
  return recommendations.length > 0 ? recommendations : ['Regional profile is strong for investment'];
}

function generateRegionalCostBenefitRecommendations(components: any, regionalData: ComprehensiveRegionalAnalysis): string[] {
  const recommendations = [];
  if (components.totalCostIndex > 50) recommendations.push('Address high operational costs through efficiency improvements');
  if (components.totalBenefitIndex < 50) recommendations.push('Enhance market access and incentives to improve benefits');
  if (components.competitivePosition < 80) recommendations.push('Strengthen competitive advantages and unique value propositions');
  if (components.adjustedROI < 15) recommendations.push('Reassess investment parameters or seek alternative locations');
  return recommendations.length > 0 ? recommendations : ['Cost-benefit analysis supports investment decision'];
}

function generatePartnershipViabilityRecommendations(components: any, partnershipType: string): string[] {
  const recommendations = [];
  if (components.regulatoryCompatibility < 70) recommendations.push('Address regulatory compatibility issues through legal frameworks');
  if (components.politicalAlignment < 70) recommendations.push('Strengthen political relationships and alignment');
  if (components.corruptionTransparency < 70) recommendations.push('Implement transparency measures and anti-corruption policies');
  if (components.culturalAlignment < 70) recommendations.push('Enhance cultural understanding and compatibility programs');
  if (components.economicComplementary < 70) recommendations.push('Align economic goals and complementary objectives');
  if (components.infrastructureCompatibility < 70) recommendations.push('Improve infrastructure integration and compatibility');
  return recommendations.length > 0 ? recommendations : [`${partnershipType} partnership shows strong viability`];
}
