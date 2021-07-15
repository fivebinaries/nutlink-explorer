import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { API_URL } from '../../../constants';
import { handleError } from '../../../utils/api';
import { LatestBlock } from '../../../types';

export default async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const url = `${API_URL}/blocks/latest`;
  try {
    const result = await axios.get<LatestBlock>(url, {
      headers: {
        project_id: process.env.BLOCKFROST_PROJECT_ID,
      },
    });

    return res.send(result.data);
  } catch (error) {
    handleError(error, res);
  }
};
