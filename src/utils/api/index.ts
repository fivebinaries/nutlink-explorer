import { AxiosError } from 'axios';
import { NextApiResponse } from 'next';
// import { BlockFrostAPI } from '@blockfrost/blockfrost-js';

export const BASE_URL = 'http://localhost:3000';

// export const Blockfrost = new BlockFrostAPI({
//   projectId: process.env.BLOCKFROST_PROJECT_ID,
// });

export const handleError = (error: AxiosError, res: NextApiResponse): void => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return res.status(error.response.status).send(error.response.data);
  } else {
    return res.status(500).send(error);
  }
};
