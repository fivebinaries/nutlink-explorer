import { NextApiRequest, NextApiResponse } from 'next';
import { Blockfrost, handleError } from '../../../utils/api';

export default async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const block = await Blockfrost.blocksLatest();
    return res.send(block);
  } catch (error) {
    handleError(error, res);
  }
};
