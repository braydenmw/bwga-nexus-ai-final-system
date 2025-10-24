import React from 'react';

interface TradeDisruptionMetrics {
  currentTradeVolume: number;
  tariffImpact: number;
  alternativeMarketPotential: number;
  diversificationIndex: number;
  riskScore: number;
}

interface TradeDisruptionAnalysis {
  disruptionType: 'tariff' | 'geopolitical' | 'supply_chain' | 'economic';
  affectedMarkets: string[];
  metrics: TradeDisruptionMetrics;
  recommendations: string[];
  opportunityScore: number;
}

export class TradeDisruptionAnalyzer {
  // Mathematical model for trade disruption analysis
  static calculateDisruptionImpact(
    currentTradeVolume: number,
    tariffRate: number,
    alternativeMarkets: string[],
    marketDiversification: number
  ): TradeDisruptionAnalysis {
    // Core disruption calculation using economic elasticity
    const priceElasticity = -1.5; // Typical trade elasticity
    const tariffImpact = currentTradeVolume * (tariffRate / 100) * Math.abs(priceElasticity);

    // Diversification potential using Herfindahl-Hirschman Index (HHI) inverse
    const diversificationIndex = Math.min(100, marketDiversification * 10);

    // Risk assessment using volatility metrics
    const riskScore = Math.min(100, (tariffRate * 2) + (100 - diversificationIndex));

    // Alternative market potential calculation
    const alternativeMarketPotential = currentTradeVolume * (diversificationIndex / 100) * 0.8;

    // Opportunity score based on disruption and diversification potential
    const opportunityScore = Math.min(100, (alternativeMarketPotential / currentTradeVolume) * 100);

    return {
      disruptionType: 'tariff',
      affectedMarkets: alternativeMarkets,
      metrics: {
        currentTradeVolume,
        tariffImpact,
        alternativeMarketPotential,
        diversificationIndex,
        riskScore
      },
      recommendations: this.generateRecommendations(tariffRate, diversificationIndex, alternativeMarkets),
      opportunityScore
    };
  }

  private static generateRecommendations(
    tariffRate: number,
    diversificationIndex: number,
    alternativeMarkets: string[]
  ): string[] {
    const recommendations = [];

    if (tariffRate > 15) {
      recommendations.push("High tariff barriers detected. Consider immediate market diversification strategies.");
    }

    if (diversificationIndex < 30) {
      recommendations.push("Low market diversification. Prioritize development of alternative export markets.");
    }

    if (alternativeMarkets.length > 0) {
      recommendations.push(`Focus on emerging markets: ${alternativeMarkets.slice(0, 3).join(', ')}`);
    }

    recommendations.push("Implement hedging strategies for currency and commodity price volatility.");
    recommendations.push("Strengthen regional trade agreements and bilateral partnerships.");

    return recommendations;
  }

  // Advanced predictive modeling for future trade scenarios
  static predictTradeScenarios(
    baseVolume: number,
    disruptionProbability: number,
    timeHorizon: number
  ): { optimistic: number; pessimistic: number; expected: number } {
    const growthRate = 0.03; // 3% annual growth assumption
    const disruptionMultiplier = 1 - (disruptionProbability * 0.5);

    const optimistic = baseVolume * Math.pow(1 + growthRate + 0.02, timeHorizon);
    const pessimistic = baseVolume * Math.pow(1 + growthRate - 0.05, timeHorizon) * disruptionMultiplier;
    const expected = baseVolume * Math.pow(1 + growthRate, timeHorizon) * (1 - disruptionProbability * 0.3);

    return { optimistic, pessimistic, expected };
  }
}

export const TradeDisruptionDisplay: React.FC<{ analysis: TradeDisruptionAnalysis }> = ({ analysis }) => {
  const { metrics, recommendations, opportunityScore } = analysis;

  return (
    <div className="trade-disruption-analysis bg-nexus-surface-800 p-6 rounded-xl border border-nexus-accent-cyan/30">
      <h3 className="text-xl font-bold text-nexus-text-primary mb-4 flex items-center gap-3">
        <span className="text-nexus-accent-cyan">📊</span>
        Trade Disruption Analysis
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div className="bg-nexus-surface-700 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-nexus-accent-cyan mb-2">Current Trade Volume</h4>
            <p className="text-2xl font-bold text-nexus-text-primary">
              ${(metrics.currentTradeVolume / 1000000).toFixed(1)}M
            </p>
          </div>

          <div className="bg-nexus-surface-700 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-nexus-accent-brown mb-2">Tariff Impact</h4>
            <p className="text-2xl font-bold text-red-400">
              -${(metrics.tariffImpact / 1000000).toFixed(1)}M
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-nexus-surface-700 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-nexus-accent-cyan mb-2">Diversification Index</h4>
            <p className="text-2xl font-bold text-nexus-text-primary">
              {metrics.diversificationIndex.toFixed(1)}%
            </p>
          </div>

          <div className="bg-nexus-surface-700 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-nexus-accent-brown mb-2">Risk Score</h4>
            <p className="text-2xl font-bold text-yellow-400">
              {metrics.riskScore.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-nexus-text-primary mb-3">Opportunity Assessment</h4>
        <div className="bg-gradient-to-r from-nexus-accent-cyan/20 to-nexus-accent-brown/20 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-nexus-text-secondary">Market Diversification Potential</span>
            <span className="text-lg font-bold text-nexus-accent-cyan">{opportunityScore.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-nexus-surface-600 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-nexus-accent-cyan to-nexus-accent-brown h-2 rounded-full transition-all duration-500"
              style={{ width: `${opportunityScore}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-nexus-text-primary mb-3">Strategic Recommendations</h4>
        <ul className="space-y-2">
          {recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-3 p-3 bg-nexus-surface-700 rounded-lg">
              <span className="text-nexus-accent-cyan mt-1">•</span>
              <span className="text-sm text-nexus-text-secondary">{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TradeDisruptionAnalyzer;