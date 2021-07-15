import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LatestBlock } from '../types';

// Define a type for the slice state
interface BlockchainState {
  latestBlock: LatestBlock | null;
  status: 'idle' | 'loading' | 'loaded';
}

// Define the initial state using that type
const initialState: BlockchainState = {
  latestBlock: null,
  status: 'idle',
};

export const fetchLatestBlock = createAsyncThunk<LatestBlock, undefined>(
  'blockchain/fetchLatestBlock',
  async () => {
    const response = await fetch(`/api/blocks/latest`);
    const block = (await response.json()) as LatestBlock;
    console.log('block', block);
    return block;
  },
);

export const blockchainSlice = createSlice({
  name: 'tickers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchLatestBlock.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchLatestBlock.fulfilled, (state, action) => {
        const actionPayload = action.payload;
        if (!actionPayload) return;
        state.latestBlock = actionPayload;
        state.status = 'loaded';
      })
      .addCase(fetchLatestBlock.rejected, (state, action) => {
        console.log('rejected', console.log('action.error', action.error));

        state.status = 'idle';
      });
  },
});

export default blockchainSlice.reducer;
