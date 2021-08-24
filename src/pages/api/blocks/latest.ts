import { NextApiRequest, NextApiResponse } from 'next';
import { getClient, handleError } from '../../../utils/api';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { network } = req.query;
  const Blockfrost = getClient(network === 'testnet');
  try {
    const block = await Blockfrost.blocksLatest();
    return res.send(block);
  } catch (error) {
    handleError(error, res);
  }
};
