import { AxiosError } from 'axios';
import { NextApiResponse } from 'next';
import { BlockFrostAPI } from '@blockfrost/blockfrost-js';

export const BASE_URL = 'http://localhost:3000';

export const Blockfrost = new BlockFrostAPI({
  projectId: process.env.BLOCKFROST_PROJECT_ID || '',
});

export const handleError = (error: AxiosError, res: NextApiResponse): void => {
  console.error(error);
  return res.status(500).send(error);
};
