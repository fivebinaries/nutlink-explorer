import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { API_URL } from '../../../../constants';
import { POOLS } from '../../../../config/main';
import { PoolTickers, TickerList } from '../../../../types';
import { handleError } from '../../../../utils/api';

const headers = {
  project_id: process.env.BLOCKFROST_PROJECT_ID,
};
const params = { count: 100, page: 1 };

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const allTickers: TickerList = [];

    const t1 = new Date().getTime();
    const promises = POOLS.map(pool =>
      axios
        .get<PoolTickers>(`${API_URL}/nutlink/${pool.address}/tickers`, {
          headers,
          params,
        })
        .then(res => ({
          tickers: res.data,
          poolAddress: pool.address,
        })),
    );

    // Retrieve all ticker symbols
    const results = await Promise.all(promises);
    console.log('fetch of tickers took: ', (new Date().getTime() - t1) / 1000);

    results.forEach(pool =>
      pool.tickers.forEach(ticker => {
        const tickerIndex = allTickers.findIndex(t => t.name === ticker.name);
        if (tickerIndex >= 0) {
          // ticker already in the list
          allTickers[tickerIndex].pools.push(pool.poolAddress);
          allTickers[tickerIndex].count += ticker.count;
          if (ticker.latest_block > allTickers[tickerIndex].latest_block) {
            // Pool has more recent data, update latest_block for a ticker
            allTickers[tickerIndex].latest_block = ticker.latest_block;
          }
        } else {
          allTickers.push({
            name: ticker.name,
            latest_block: ticker.latest_block,
            count: ticker.count,
            pools: [pool.poolAddress],
          });
        }
      }),
    );

    return res.send(allTickers);
  } catch (error) {
    handleError(error, res);
  }
};
