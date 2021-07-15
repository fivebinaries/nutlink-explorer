import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '.';
import { TickerList } from '../types';
import { fetchTickerDatapoints } from './datapoints';
import { fetchMetadata } from './oracles';

// Define a type for the slice state
interface PoolsState {
  tickers: TickerList;
  status: 'loading' | 'idle' | 'loaded';
}

// Define the initial state using that type
const initialState: PoolsState = {
  tickers: [],
  status: 'idle',
};

export const fetchAllTickers = createAsyncThunk<
  TickerList,
  undefined,
  {
    dispatch: AppDispatch;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>('oracles/fetchAllTickers', async (_, thunkApi) => {
  const response = await fetch(`/api/nutlink/all/tickers`);
  const list = (await response.json()) as TickerList;
  list.forEach(t => {
    thunkApi.dispatch(fetchTickerDatapoints({ oracles: t.pools, ticker: t.name }));
  });

  const oraclesAddress = new Set(list.map(t => t.pools).flat());
  oraclesAddress.forEach(address => {
    thunkApi.dispatch(fetchMetadata(address));
  });
  return list;
});

export const tickersSlice = createSlice({
  name: 'tickers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllTickers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAllTickers.fulfilled, (state, action) => {
        const actionPayload = action.payload;
        if (!actionPayload) return;
        state.tickers = actionPayload;
        state.status = 'loaded';
      })
      .addCase(fetchAllTickers.rejected, (state, action) => {
        console.log('rejected', console.log('action.error', action.error));

        state.status = 'idle';
      });
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectTicker = (
  state: RootState,
  name: string,
): RootState['tickers']['tickers'][number] | undefined =>
  state.tickers.tickers.find(t => t.name === name);

export default tickersSlice.reducer;
