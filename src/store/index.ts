import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import oraclesReducer from './oracles';
import tickersReducer from './tickers';
import datapointsReducer from './datapoints';
import blockchainReducer from './blockchain';

export const store = configureStore({
  reducer: {
    oracles: oraclesReducer,
    tickers: tickersReducer,
    datapoints: datapointsReducer,
    blockchain: blockchainReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
