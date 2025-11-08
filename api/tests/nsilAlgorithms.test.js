const { NSILAlgorithms } = require('../utils/nsilAlgorithms');

describe('NSIL Algorithms', () => {
  describe('analyzeDealSuccessFactors', () => {
    test('should return valid NSILAnalysisResult structure', () => {
      const input = {
        economicStability: 75,
        politicalStability: 70,
        regulatoryQuality: 80,
        infrastructureQuality: 85,
        marketAccess: 90,
        humanCapital: 78,
        corruptionIndex: 25,
        contractEnforcement: 82,
        partnerReputation: 88,
        culturalCompatibility: 85,
        technologyAdoption: 76,
        financialHealth: 80
      };

      const result = NSILAlgorithms.analyzeDealSuccessFactors(input);

      expect(result).toHaveProperty('score');
      expect(result).toHaveProperty('components');
      expect(result).toHaveProperty('recommendations');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('analysis');
      expect(typeof result.confidence).toBe('number');
      expect(result.confidence).toBeGreaterThanOrEqual(0);
      expect(result.confidence).toBeLessThanOrEqual(1);
    });

    test('should handle edge cases', () => {
      const input = {
        economicStability: 0,
        politicalStability: 0,
        regulatoryQuality: 0,
        infrastructureQuality: 0,
        marketAccess: 0,
        humanCapital: 0,
        corruptionIndex: 100,
        contractEnforcement: 0,
        partnerReputation: 0,
        culturalCompatibility: 0,
        technologyAdoption: 0,
        financialHealth: 0
      };

      const result = NSILAlgorithms.analyzeDealSuccessFactors(input);
      expect(result).toHaveProperty('score');
      expect(result).toHaveProperty('components');
    });
  });

  describe('analyzeTrustFactors', () => {
    test('should return valid NSILAnalysisResult structure', () => {
      const partnerData = {
        reputation: 70,
        trackRecord: 75,
        transparency: 65,
        communication: 70,
        alignment: 80,
        powerBalance: 60,
        exitStrategy: 55,
        conflictResolution: 65
      };
      const dealContext = {};

      const result = NSILAlgorithms.analyzeTrustFactors(partnerData, dealContext);

      expect(result).toHaveProperty('score');
      expect(result).toHaveProperty('components');
      expect(result).toHaveProperty('recommendations');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('analysis');
      expect(typeof result.confidence).toBe('number');
    });

    test('should handle missing input gracefully', () => {
      const partnerData = {};
      const dealContext = {};
      const result = NSILAlgorithms.analyzeTrustFactors(partnerData, dealContext);
      expect(result).toHaveProperty('score');
    });
  });

  describe('analyzeInvestmentAttraction', () => {
    test('should return valid NSILAnalysisResult structure', () => {
      const governmentData = {
        incentives: 75,
        businessEase: 70,
        taxRegime: 65,
        ipProtection: 80,
        disputeResolution: 75,
        marketSize: 85,
        growthPotential: 80,
        location: 70,
        politicalStability: 65,
        corruption: 30,
        infrastructure: 75,
        workforce: 70
      };
      const investorData = {};

      const result = NSILAlgorithms.analyzeInvestmentAttraction(governmentData, investorData);

      expect(result).toHaveProperty('score');
      expect(result).toHaveProperty('components');
      expect(result).toHaveProperty('recommendations');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('analysis');
      expect(typeof result.confidence).toBe('number');
    });

    test('should handle zero values', () => {
      const governmentData = {
        incentives: 0,
        businessEase: 0,
        taxRegime: 0,
        ipProtection: 0,
        disputeResolution: 0,
        marketSize: 0,
        growthPotential: 0,
        location: 0,
        politicalStability: 0,
        corruption: 100,
        infrastructure: 0,
        workforce: 0
      };
      const investorData = {};

      const result = NSILAlgorithms.analyzeInvestmentAttraction(governmentData, investorData);
      expect(result).toHaveProperty('score');
    });
  });

  describe('Integration with SuperReportWizard', () => {
    test('algorithms should be callable from external components', () => {
      // Simulate how SuperReportWizard might call these algorithms
      const dealInput = {
        economicStability: 75,
        politicalStability: 70,
        regulatoryQuality: 80,
        infrastructureQuality: 85,
        marketAccess: 90,
        humanCapital: 78,
        corruptionIndex: 25,
        contractEnforcement: 82,
        partnerReputation: 88,
        culturalCompatibility: 85,
        technologyAdoption: 76,
        financialHealth: 80
      };
      const trustPartnerData = {
        reputation: 70,
        trackRecord: 75,
        transparency: 65,
        communication: 70,
        alignment: 80,
        powerBalance: 60,
        exitStrategy: 55,
        conflictResolution: 65
      };
      const trustDealContext = {};
      const investmentGovernmentData = {
        incentives: 75,
        businessEase: 70,
        taxRegime: 65,
        ipProtection: 80,
        disputeResolution: 75,
        marketSize: 85,
        growthPotential: 80,
        location: 70,
        politicalStability: 65,
        corruption: 30,
        infrastructure: 75,
        workforce: 70
      };
      const investmentInvestorData = {};

      const dealResult = NSILAlgorithms.analyzeDealSuccessFactors(dealInput);
      const trustResult = NSILAlgorithms.analyzeTrustFactors(trustPartnerData, trustDealContext);
      const investmentResult = NSILAlgorithms.analyzeInvestmentAttraction(investmentGovernmentData, investmentInvestorData);

      expect(dealResult).toBeDefined();
      expect(trustResult).toBeDefined();
      expect(investmentResult).toBeDefined();

      // Ensure all results have consistent structure
      [dealResult, trustResult, investmentResult].forEach(result => {
        expect(result).toHaveProperty('score');
        expect(result).toHaveProperty('components');
        expect(result).toHaveProperty('recommendations');
        expect(result).toHaveProperty('confidence');
        expect(result).toHaveProperty('analysis');
      });
    });
  });
});
