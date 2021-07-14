import React, { useRef, useLayoutEffect } from 'react';
import { useTheme } from 'styled-components';
import { getCurrencySymbol } from '../../../utils/text';

interface Props {
  setWidth: (n: number) => void;
  localCurrency?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
}

const CustomYAxisTick = (props: Props) => {
  const { x, y, payload, setWidth } = props;
  const theme = useTheme();
  const ref = useRef<SVGGElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setWidth(rect.width);
    }
  }, [ref, setWidth]);

  return (
    <g ref={ref} transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={0}
        dx={6}
        textAnchor="start"
        fill={theme.TYPE_LIGHT_GREY}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {props.localCurrency ? getCurrencySymbol(props.localCurrency) : undefined}
        {payload.value}
      </text>
    </g>
  );
};
export default CustomYAxisTick;
