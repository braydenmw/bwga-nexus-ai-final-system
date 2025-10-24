import type { EconomicData, WorldBankResponse } from '../types.ts';

// Live World Bank API integration for Vercel Edge Functions
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
  "India": "IND",
  "United States": "USA",
  "Germany": "DEU",
  "United Kingdom": "GBR",
  "France": "FRA",
  "Australia": "AUS"
};

async function fetchWorldBankData(indicator: string, countryCode: string): Promise<any[]> {
  const url = `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicator}?date=2018:2023&format=json&per_page=10`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'BWGA-Nexus-AI/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`World Bank API error: ${response.status}`);
    }

    const data = await response.json();

    // World Bank API returns [metadata, data_array]
    if (Array.isArray(data) && data.length > 1 && Array.isArray(data[1])) {
      return data[1].filter((item: any) => item.value !== null);
    }

    return [];
  } catch (error) {
    console.error(`World Bank API error for ${indicator}:`, error);
    return [];
  }
}

const getGDPData = async (countryCode: string): Promise<any[]> => {
  return await fetchWorldBankData("NY.GDP.MKTP.CD", countryCode);
};

const getPopulationData = async (countryCode: string): Promise<any[]> => {
  return await fetchWorldBankData("SP.POP.TOTL", countryCode);
};

const getInflationData = async (countryCode: string): Promise<any[]> => {
  return await fetchWorldBankData("FP.CPI.TOTL.ZG", countryCode);
};

const getFDIData = async (countryCode: string): Promise<any[]> => {
  return await fetchWorldBankData("BX.KLT.DINV.CD.WD", countryCode);
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