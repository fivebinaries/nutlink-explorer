import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '.';
import { OracleMetadata } from '../types';
import { getParams } from '../utils/url';

interface Oracle {
  address: string;
  metadata: OracleMetadata;
}

// Define a type for the slice state
interface PoolsState {
  oracles: Oracle[];
  status: 'loading' | 'idle';
}

// Define the initial state using that type
const initialState: PoolsState = {
  oracles: [],
  status: 'idle',
};

export const fetchMetadata = createAsyncThunk<
  Oracle | undefined,
  string,
  {
    state: RootState;
  }
>('oracles/fetchMetadata', async (address: string, { getState }) => {
  const exists = getState().oracles.oracles.find(o => o.address === address);
  if (exists) return;
  const params = getParams({ testnet: getState().blockchain.network === 'testnet' });
  const response = await fetch(`/api/nutlink/oracle/${address}?${params}`);
  const json = await response.json();
  return { address, metadata: json } as Oracle;
});

export const poolsSlice = createSlice({
  name: 'oracles',
  initialState,
  reducers: {
    addOracle: (state, action: PayloadAction<Oracle>) => {
      const index = state.oracles.findIndex(o => o.address === action.payload.address);
      if (index >= 0) {
        state.oracles[index] = action.payload;
      } else {
        state.oracles.push(action.payload);
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMetadata.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchMetadata.fulfilled, (state, action) => {
        const actionPayload = action.payload;
        if (!actionPayload) return;
        const oracle = state.oracles.find(o => o.address === actionPayload.address);
        if (oracle) {
          oracle.metadata = actionPayload.metadata;
        } else {
          state.oracles.push(actionPayload);
        }
        state.status = 'idle';
      })
      .addCase(fetchMetadata.rejected, (state, action) => {
        console.log('rejected', console.log('action.error', action.error));

        state.status = 'idle';
      });
  },
});

export const { addOracle } = poolsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectOracle = (
  state: RootState,
  address: string,
): RootState['oracles']['oracles'][number] | undefined =>
  state.oracles.oracles.find(o => o.address === address);

export default poolsSlice.reducer;
