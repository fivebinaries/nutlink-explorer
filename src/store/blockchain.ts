import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { LatestBlock } from '../types';
import { getParams } from '../utils/url';

// Define a type for the slice state
interface BlockchainState {
  latestBlock: LatestBlock | null;
  network: 'mainnet' | 'testnet';
  status: 'idle' | 'loading' | 'loaded';
}

// Define the initial state using that type
const initialState: BlockchainState = {
  latestBlock: null,
  network: 'mainnet',
  status: 'idle',
};

export const fetchLatestBlock = createAsyncThunk<
  LatestBlock,
  undefined,
  {
    state: RootState;
  }
>('blockchain/fetchLatestBlock', async (_, { getState }) => {
  const params = getParams({ testnet: getState().blockchain.network === 'testnet' });
  const response = await fetch(`/api/blocks/latest?${params}`);
  const block = (await response.json()) as LatestBlock;
  console.log('block', block);
  return block;
});

export const blockchainSlice = createSlice({
  name: 'tickers',
  initialState,
  reducers: {
    changeNetwork: (state, action: PayloadAction<BlockchainState['network']>) => {
      state.network = action.payload;
    },
  },
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

export const { changeNetwork } = blockchainSlice.actions;

export default blockchainSlice.reducer;
