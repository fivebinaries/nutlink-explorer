import React from 'react';
import NumberFormat, { NumberFormatPropsBase } from 'react-number-format';
import { TICKERS } from '../../config/main';
import { getCurrencySymbol } from '../../utils/text';

interface Props extends NumberFormatPropsBase {
  tickerName?: string;
  currency?: string;
}

const FiatValue = ({ tickerName, currency, ...rest }: Props) => {
  const tickerCurrency = currency ?? TICKERS.find(t => t.name === tickerName)?.currency;
  return (
    <NumberFormat
      displayType={'text'}
      thousandSeparator={true}
      prefix={tickerCurrency ? getCurrencySymbol(tickerCurrency) : undefined}
      {...rest}
    />
  );
};

export default FiatValue;
