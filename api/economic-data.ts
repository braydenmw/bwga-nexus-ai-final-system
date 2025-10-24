import type { EconomicData, WorldBankResponse } from '../types.ts';

// Mock data for Vercel deployment - enhanced with more realistic data
const COUNTRY_CODES: Record<string, string> = {
  "Philippines": "PHL",
  "Singapore": "SGP",
  "Malaysia": "MYS",
  "Indonesia": "IDN",
  "Thailand": "THA",
  "Vietnam": "VNM",
  "China": "CHN",
  "Japan": "JPN",
  "South Korea": "KOR",
  "India": "IND"
};

const MOCK_ECONOMIC_DATA: Record<string, any> = {
  "PHL": {
    gdp: [{ value: 450000000000, date: "2023" }],
    population: [{ value: 110000000, date: "2023" }],
    inflation: [{ value: 2.8, date: "2023" }],
    fdi: [{ value: 25000000000, date: "2023" }]
  },
  "SGP": {
    gdp: [{ value: 600000000000, date: "2023" }],
    population: [{ value: 6000000, date: "2023" }],
    inflation: [{ value: 1.2, date: "2023" }],
    fdi: [{ value: 150000000000, date: "2023" }]
  },
  "MYS": {
    gdp: [{ value: 400000000000, date: "2023" }],
    population: [{ value: 33000000, date: "2023" }],
    inflation: [{ value: 2.1, date: "2023" }],
    fdi: [{ value: 18000000000, date: "2023" }]
  },
  "IDN": {
    gdp: [{ value: 1400000000000, date: "2023" }],
    population: [{ value: 270000000, date: "2023" }],
    inflation: [{ value: 3.2, date: "2023" }],
    fdi: [{ value: 35000000000, date: "2023" }]
  },
  "THA": {
    gdp: [{ value: 500000000000, date: "2023" }],
    population: [{ value: 70000000, date: "2023" }],
    inflation: [{ value: 1.8, date: "2023" }],
    fdi: [{ value: 22000000000, date: "2023" }]
  }
};

const getGDPData = async (countryCode: string): Promise<any[]> => {
  return MOCK_ECONOMIC_DATA[countryCode]?.gdp || [{ value: 450000000000, date: "2023" }];
};

const getPopulationData = async (countryCode: string): Promise<any[]> => {
  return MOCK_ECONOMIC_DATA[countryCode]?.population || [{ value: 110000000, date: "2023" }];
};

const getInflationData = async (countryCode: string): Promise<any[]> => {
  return MOCK_ECONOMIC_DATA[countryCode]?.inflation || [{ value: 2.8, date: "2023" }];
};

const getFDIData = async (countryCode: string): Promise<any[]> => {
  return MOCK_ECONOMIC_DATA[countryCode]?.fdi || [{ value: 25000000000, date: "2023" }];
};

export const config = {
  runtime: 'edge',
};

const getLatestData = (data: WorldBankResponse[]): { value: number; year: string } | undefined => {
    if (!data || data.length === 0) return undefined;
    const sortedData = data.sort((a, b) => parseInt(b.date) - parseInt(a.date));
    const latest = sortedData[0];
    return { value: latest.value, year: latest.date };
};

export default async function handler(request: Request) {
  const { searchParams } = new URL(request.url);
  const countryName = searchParams.get('country');

  if (!countryName) {
    return new Response(JSON.stringify({ error: 'Country parameter is required.' }), { status: 400 });
  }

  const countryCode = COUNTRY_CODES[countryName];
  if (!countryCode) {
    return new Response(JSON.stringify({ error: `Invalid or unsupported country: ${countryName}` }), { status: 404 });
  }

  try {
    const results = await Promise.allSettled([
        getGDPData(countryCode),
        getPopulationData(countryCode),
        getInflationData(countryCode),
        getFDIData(countryCode),
    ]);
    
    const economicData: EconomicData = {
        gdp: results[0].status === 'fulfilled' ? getLatestData(results[0].value) : undefined,
        population: results[1].status === 'fulfilled' ? getLatestData(results[1].value) : undefined,
        inflation: results[2].status === 'fulfilled' ? getLatestData(results[2].value) : undefined,
        fdi: results[3].status === 'fulfilled' ? getLatestData(results[3].value) : undefined,
    };
    
    return new Response(JSON.stringify(economicData), {
      status: 200,
      headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
      },
    });

  } catch (error) {
    console.error(`Error fetching World Bank data for ${countryName}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: `Failed to fetch economic data. Details: ${errorMessage}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}