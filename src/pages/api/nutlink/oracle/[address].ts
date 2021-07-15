import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { API_URL } from '../../../../constants';
import { handleError } from '../../../../utils/api';
import { OracleMetadata } from '../../../../types';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { address } = req.query;

  try {
    const results = await axios.get<OracleMetadata>(`${API_URL}/nutlink/${address}`, {
      headers: {
        project_id: process.env.BLOCKFROST_PROJECT_ID,
      },
    });

    let metadata = results.data.metadata;
    if (!metadata) {
      const metadataResults = await axios
        .get<OracleMetadata['metadata']>(results.data.metadata_url, {
          headers: {
            project_id: process.env.BLOCKFROST_PROJECT_ID,
          },
        })
        .catch(() => {
          console.log('failed pool metadata fetch for ', address);
          return null;
        });
      if (metadataResults?.data?.name) {
        metadata = metadataResults?.data;
      }
    }

    return res.send({ ...results.data, metadata });
  } catch (error) {
    handleError(error, res);
  }
};
