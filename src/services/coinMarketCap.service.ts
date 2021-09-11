/* eslint-disable camelcase */
import axios from 'axios';

import { coinMarketCapConfig } from '../config';

const client = axios.create({
  baseURL: coinMarketCapConfig.baseUrl,
  headers: {
    'X-CMC_PRO_API_KEY': coinMarketCapConfig.apiKey,
    Accept: 'application/json',
  },
});

enum CmcEndpoint {
  LatestCoinsListing = '/listings/latest',
  LatestCoinQuotes = '/quotes/latest',
}

type CmcStatus = {
  credit_count: number;
  elapsed: number;
  error_code: number;
  error_message: string | null;
  notice: string | null;
  timestamp: string;
  total_count: number;
};

type CryptoCurrencyListing = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmc_rank: number;
  num_market_pairs: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  last_updated: string;
  date_added: string;
  tags: string[];
  platform: unknown;
  quote: Record<
    string,
    {
      price: number;
      volume_24h: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      market_cap: number;
      last_updated: string;
    }
  >;
};

/**
 * Get list of available coins.
 * Documentation: https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyListingsLatest
 */
const getCoinsList = async () => {
  const { data } = await client.get<{
    data: CryptoCurrencyListing[];
    status: CmcStatus;
  }>(CmcEndpoint.LatestCoinsListing);

  return data;
};

type CryptoCurrencyQuote = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  is_active: number;
  is_fiat: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  date_added: string;
  num_market_pairs: number;
  cmc_rank: number;
  last_updated: string;
  tags: string[];
  platform: unknown;
  quote: Record<
    string,
    {
      price: number;
      volume_24h: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      market_cap: number;
      last_updated: string;
    }
  >;
};

/**
 * Get the latest crypto currency price by provided currency IDs.
 * Documentation: https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyQuotesLatest
 */
const getQuotes = async (currencyIds: string) => {
  const { data } = await client.get<{
    data: Record<string, CryptoCurrencyQuote>;
    status: CmcStatus;
  }>(CmcEndpoint.LatestCoinQuotes, {
    params: { id: currencyIds },
  });

  return data;
};

export { getCoinsList, getQuotes };
