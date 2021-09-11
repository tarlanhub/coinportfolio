import { NextApiRequest, NextApiResponse } from 'next';
import React, { useState } from 'react';

import { getCoinsList, getQuotes } from '../../services/coinMarketCap.service';
import { logger } from '../../services/logger.service';
/**
 * GET /api/coins
 */
export const listCoinsHandler = async (
  _: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const coins = await getCoinsList();
    const data = res.status(200).json(coins);

    return data;
  } catch (error) {
    logger.error(`Failed to load cryptocurrencies listing, ${error.message}`);

    return res
      .status(500)
      .json({ message: 'Failed to load cryptocurrencies listing' });
  }
};

/**
 * GET /api/quotes?ids=currencyIdCommaSeparated
 *
 * Example request GET /api/quotes?ids=1,2
 */
export const getCoinQuoteHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    query: { ids },
  } = req;

  if (!ids) {
    return res.status(500).send({
      error: 'Missing ids parameter',
      message:
        'Please, provide list of ids as comma separated query parameter, e.g. ids=1,2',
    });
  }

  try {
    const coinQuotes = await getQuotes(ids as string);

    return res.status(200).json(coinQuotes);
  } catch (error) {
    logger.error(`Failed to load cryptocurrencies quotes, ${error.message}`);

    return res
      .status(500)
      .json({ message: 'Failed to load cryptocurrencies quotes' });
  }
};
