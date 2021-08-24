import { NextApiRequest, NextApiResponse } from 'next';
import { getClient } from '../../../../utils/api';
import { ITEMS_PER_PAGE } from '../../../../config/main';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { count, page, slug, network } = req.query;
  const [address, ticker] = slug;
  const Blockfrost = getClient(network === 'testnet');

  try {
    const results = await Blockfrost.nutlinkAddressTicker(address, ticker, {
      page: page ? parseInt(page as string) : 1,
      count: count ? parseInt(count as string) : ITEMS_PER_PAGE,
      order: 'desc',
    });

    return res.send({
      address,
      ticker,
      pagination: {
        page: page ?? 1,
        count: results.length,
      },
      payload: results,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
