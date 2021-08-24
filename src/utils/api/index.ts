import { AxiosError } from 'axios';
import { NextApiResponse } from 'next';
import { BlockFrostAPI } from '@blockfrost/blockfrost-js';

export const Blockfrost = new BlockFrostAPI({
  projectId: process.env.BLOCKFROST_PROJECT_ID_MAINNET || '',
});

export const BlockfrostTestnet = new BlockFrostAPI({
  projectId: process.env.BLOCKFROST_PROJECT_ID_TESTNET || '',
  isTestnet: true,
});

export const getClient = (testnet: boolean): BlockFrostAPI =>
  testnet ? BlockfrostTestnet : Blockfrost;

export const handleError = (error: AxiosError, res: NextApiResponse): void => {
  console.error(error);
  return res.status(500).send(error);
};
