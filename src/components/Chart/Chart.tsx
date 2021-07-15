import React, { useState } from 'react';
import BigNumber from 'bignumber.js';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  //   Tooltip,
  ResponsiveContainer,
} from 'recharts';
import CustomYAxisTick from './CustomYAxisTick';
import { TickerDatapoint } from '../../types';
import { TICKERS } from '../../config/main';
import { useTheme } from 'styled-components';

interface Props {
  tickerName: string;
  tickerData: TickerDatapoint[] | undefined;
}

const Chart = ({ tickerData, tickerName }: Props) => {
  const theme = useTheme();
  const [maxYTickWidth, setMaxYTickWidth] = useState(20);
  const setWidth = (n: number) => {
    setMaxYTickWidth(prevValue => (prevValue > n ? prevValue : n));
  };
  const rightMargin = Math.max(0, maxYTickWidth - 50) + 10; // 50 is the default spacing

  const graphData = tickerData
    ?.map(d => {
      const payloadAvg = d?.payload
        .reduce((accPayload, payload) => accPayload.plus(payload.value), new BigNumber(0))
        .div((d?.payload ?? []).length)
        .toFixed();
      return {
        block: d?.block_height,
        avg: payloadAvg,
      };
    })
    .reverse();

  return (
    <ResponsiveContainer>
      <LineChart
        margin={{
          top: 20,
          right: rightMargin,
        }}
        width={600}
        height={300}
        data={graphData}
      >
        <CartesianGrid horizontal vertical={false} stroke="#EBEEF3" />
        <Line type="linear" dot={false} dataKey="avg" stroke={theme.TYPE_BLUE} />
        <XAxis dataKey="block" tickLine={false} axisLine={false} dy={6} />
        {/* <Tooltip /> */}
        <YAxis
          type="number"
          orientation="right"
          axisLine={false}
          domain={['minMax', 'dataMax']}
          tickLine={false}
          tick={
            <CustomYAxisTick
              setWidth={setWidth}
              localCurrency={TICKERS.find(t => t.name === tickerName)?.currency}
            />
          }
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
