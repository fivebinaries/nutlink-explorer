import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch } from '.';
import { PoolTicker, TickerDatapoint } from '../types';

// Define a type for the slice state
export interface PoolsState {
  datapoints: {
    [ticker: string]: {
      oracleAddress: string;
      datapoints: TickerDatapoint[];
    }[];
  };
  status: 'loading' | 'idle' | 'loaded';
}

// Define the initial state using that type
const initialState: PoolsState = {
  datapoints: {},
  status: 'idle',
};

export const fetchTickerDatapointsForPool = createAsyncThunk<
  PoolTicker,
  { oracle: string; ticker: string; page?: number }
>('oracles/fetchTickerDatapoints', async ({ oracle, ticker, page }) => {
  const params = new URLSearchParams({
    page: page?.toString() ?? '1',
  });
  const response = await fetch(`/api/nutlink/address/${oracle}/${ticker}?${params}`);
  const jsonRes = (await response.json()) as PoolTicker;
  return jsonRes;
});

export const fetchTickerDatapoints = createAsyncThunk<
  void,
  { oracles: string[]; ticker: string },
  {
    dispatch: AppDispatch;
  }
>('oracles/fetchTickerDatapoints', async ({ oracles, ticker }, thunkApi) => {
  oracles.forEach(oracle => thunkApi.dispatch(fetchTickerDatapointsForPool({ oracle, ticker })));
});

export const datapointsSlice = createSlice({
  name: 'datapoints',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTickerDatapointsForPool.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTickerDatapointsForPool.fulfilled, (state, action) => {
        const actionPayload = action.payload;
        if (!actionPayload) return;
        const tickerEntry = state.datapoints[actionPayload.ticker];
        if (tickerEntry) {
          const poolEntry = tickerEntry.find(e => e.oracleAddress === actionPayload.address);
          if (poolEntry) {
            console.log('data already in maybe add another page?');
            if (actionPayload.pagination.page > 1) {
              // block height of oldest datapoint
              const currentLowestBlockHeigh =
                poolEntry.datapoints[poolEntry.datapoints.length - 1].block_height;
              if (currentLowestBlockHeigh > actionPayload.payload[0].block_height) {
                // actionPayload has older data, so we can append them as next page
                poolEntry.datapoints.push(...actionPayload.payload);
              }
            }
          } else {
            tickerEntry.push({
              oracleAddress: actionPayload.address,
              datapoints: actionPayload.payload,
            });
          }
        } else {
          state.datapoints[actionPayload.ticker] = [
            {
              oracleAddress: actionPayload.address,
              datapoints: actionPayload.payload,
            },
          ];
        }
        state.status = 'loaded';
      })
      .addCase(fetchTickerDatapointsForPool.rejected, (state, action) => {
        console.log('rejected', console.log('action.error', action.error));

        state.status = 'idle';
      });
  },
});

export default datapointsSlice.reducer;
