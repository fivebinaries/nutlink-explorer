import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getClient, handleError } from '../../../../utils/api';
import { OracleMetadata } from '../../../../types';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { address, network } = req.query;
  const Blockfrost = getClient(network === 'testnet');

  try {
    const results = await Blockfrost.nutlinkAddress(address as string);

    let metadata = results.metadata;
    if (!metadata) {
      const metadataResults = await axios
        .get<OracleMetadata['metadata']>(results.metadata_url)
        .catch(() => {
          console.log('failed pool metadata fetch for ', address);
          return null;
        });
      if (metadataResults?.data?.name) {
        metadata = metadataResults?.data;
      }
    }

    return res.send({ ...results, metadata });
  } catch (error) {
    handleError(error, res);
  }
};
