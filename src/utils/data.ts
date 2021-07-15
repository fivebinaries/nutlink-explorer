import BigNumber from 'bignumber.js';
import { PoolsState } from '../store/datapoints';
import { TickerDatapoint } from '../types';

type InvalidDatapoint = Omit<TickerDatapoint, 'payload'> & { payload: unknown };

export const filterInvalidDatapoints = (
  data: TickerDatapoint[] | undefined,
): { valid: TickerDatapoint[]; invalid: InvalidDatapoint[] } => {
  const valid = [];
  const invalid = [];

  if (data) {
    for (const datapoint of data) {
      if (Array.isArray(datapoint.payload)) {
        let areAllPayloadsValid = true;
        for (const payload of datapoint.payload) {
          if (
            !(
              payload.source &&
              typeof payload.source === 'string' &&
              payload.value &&
              typeof payload.value === 'string'
            )
          ) {
            areAllPayloadsValid = false;
          }
        }
        if (areAllPayloadsValid) {
          valid.push(datapoint);
        } else {
          invalid.push(datapoint);
        }
      } else {
        invalid.push(datapoint);
      }
    }
  }

  return {
    valid,
    invalid,
  };
};

export const calculateDatapointAvgValue = (datapoint: TickerDatapoint): string =>
  datapoint.payload
    .reduce((accPayload, payload) => accPayload.plus(payload.value), new BigNumber(0))
    .div((datapoint.payload ?? []).length)
    .toFixed();

export const getTickerAvgValue = (
  tickerDatapoints: PoolsState['datapoints'][string],
  currentBlockHeight?: number,
): string => {
  const oraclesData = tickerDatapoints ?? [];
  const poolAverages: string[] = [];
  let mostRecentOracle: PoolsState['datapoints'][string][number] | null = null;

  oraclesData.forEach(oracle => {
    const validDatapoints = filterInvalidDatapoints(oracle.datapoints).valid;
    if (validDatapoints.length > 0) {
      const lastDatapoint = validDatapoints[0];

      if (!mostRecentOracle) {
        mostRecentOracle = oracle;
      }

      if (
        lastDatapoint.block_height >
        filterInvalidDatapoints(mostRecentOracle.datapoints).valid[0].block_height
      ) {
        mostRecentOracle = oracle;
      }

      const age = currentBlockHeight ? currentBlockHeight - lastDatapoint.block_height : null;
      if (!age || age < 200) {
        // don't include pools with stale data (lagging 200+ blocks)
        poolAverages.push(calculateDatapointAvgValue(lastDatapoint));
      }
    }
  });

  if (poolAverages.length === 0 && mostRecentOracle) {
    const valid = filterInvalidDatapoints(
      (mostRecentOracle as PoolsState['datapoints'][string][number]).datapoints,
    ).valid;
    poolAverages.push(calculateDatapointAvgValue(valid[0]));
  }

  return poolAverages
    .reduce((acc, next) => acc.plus(next), new BigNumber(0))
    .div(poolAverages.length)
    .toFixed();
};
