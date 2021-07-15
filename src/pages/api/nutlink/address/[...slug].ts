import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { API_URL } from '../../../../constants';
import { handleError } from '../../../../utils/api';
import { TickerDatapoint } from '../../../../types';
import { ITEMS_PER_PAGE } from '../../../../config/main';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { count, page, slug } = req.query;
  const [address, ticker] = slug;

  let url = `${API_URL}/nutlink/${address}/tickers`;

  if (ticker) {
    url = `${url}/${ticker}`;
  }
  try {
    const results = await axios.get<TickerDatapoint[]>(url, {
      headers: {
        project_id: process.env.BLOCKFROST_PROJECT_ID,
      },
      params: { count: count ?? ITEMS_PER_PAGE, page: page ?? 1, order: 'desc' },
    });

    return res.send({
      address,
      ticker,
      pagination: {
        page: page ?? 1,
        count: results.data.length,
      },
      payload: results.data,
    });
  } catch (error) {
    handleError(error, res);
  }
};

// Replace once blockfrost sdk is fixed
// import { NextApiRequest, NextApiResponse } from 'next';
// import { Blockfrost } from '../../../../utils/api';
// import { ITEMS_PER_PAGE } from '../../../../config/main';

// export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
//   const { count, page, slug } = req.query;
//   const [address, ticker] = slug;

//   try {
//     const results = await Blockfrost.nutlinkAddressTicker(address, ticker, {
//       count: count ? parseInt(count as string) : ITEMS_PER_PAGE,
//       page: page ? parseInt(page as string) : 1,
//       order: 'desc',
//     });

//     return res.send({
//       address,
//       ticker,
//       pagination: {
//         page: page ?? 1,
//         count: results.data.length,
//       },
//       payload: results.data,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send(error);
//   }
// };
