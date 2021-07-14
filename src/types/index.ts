export interface OracleMetadata {
  metadata_url: string;
  metadata_hash: string;
  metadata:
    | {
        ticker?: string;
        name?: string;
        description?: string;
        homepage?: string;
        address?: string;
      }
    | null
    | undefined;
}

export type ApiErrorType = {
  status_code: number;
  message: string;
  error: string;
};

export interface TickerDatapoint {
  poolAddress: string;
  block_height: number;
  tx_hash: string;
  tx_index: number;
  payload: { value: string; source: string }[];
}

export interface PoolTicker {
  address: string;
  ticker: string;
  pagination: {
    page: number;
    count: number;
  };
  payload: TickerDatapoint[];
}

export type PoolTickers = {
  name: string;
  count: number;
  latest_block: number;
}[];

export type TickerList = {
  name: string;
  count: number;
  latest_block: number;
  pools: string[];
}[];

export interface LatestBlock {
  height: number;
}
