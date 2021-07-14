import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import { getTickerAvgValue } from '../../utils/data';
import FiatValue from '../FiatValue/FiatValue';
import Link from '../Link/Link';
import Text from '../Text/Text';
import Tooltip from '../Tooltip/Tooltip';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 4px;
  box-shadow: rgb(25 28 31 / 8%) 0px 14px 32px, rgb(25 28 31 / 4%) 0px 8px 16px,
    rgb(25 28 31 / 4%) 0px -1px 0px;
  overflow: hidden;
`;

const Thumb = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 24px 0px 24px;
  color: ${props => props.theme.TYPE_DARK_GREY};
  background-size: cover;
  background-position: center center;
  position: relative;
`;

const Content = styled.div`
  display: flex;
  padding: 24px;
  color: #1b202f;
`;

const TickerName = styled.h4`
  font-weight: bolder;
  color: ${props => props.theme.TYPE_BLUE};
  margin-bottom: 12px;
`;

const Value = styled.span`
  font-weight: bold;
  color: ${props => props.theme.TYPE_DARK_GRAY};
`;

const Footer = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  flex-direction: column;
`;

const FooterCol = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1 1 auto;
`;

const FooterText = styled(Text)`
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
`;

const FooterHeading = styled(Text)`
  font-size: 12px;
  white-space: pre;
  font-weight: 500;
  margin-bottom: 2px;
`;

const WrapperLink = styled(Link)`
  display: flex;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;

  & + & {
    margin-top: 8px;
  }
`;

type Props = {
  ticker: string;
  pools: string[];
  latestBlock: number;
  count: number;
};

const TickerItem = ({ ticker, pools, latestBlock, count, ...rest }: Props) => {
  const tickerDatapoints = useAppSelector(s => s.datapoints.datapoints[ticker]) ?? [];
  const blockchainHeight = useAppSelector(s => s.blockchain.latestBlock?.height);
  const tickerAvgValue = getTickerAvgValue(tickerDatapoints, blockchainHeight);
  const age = blockchainHeight ? blockchainHeight - latestBlock : null;
  return (
    <Wrapper {...rest}>
      <Thumb>
        <WrapperLink variant="inheritStyle" href={`/tickers/${ticker}`}>
          <TickerName>{ticker}</TickerName>
        </WrapperLink>
        <Value>
          <FiatValue value={tickerAvgValue} isNumericString tickerName={ticker} />
        </Value>
      </Thumb>
      <Content>
        <Footer>
          <Row>
            <FooterCol>
              <FooterHeading variant="secondary"># of Oracles</FooterHeading>
              <FooterText variant="primary">{pools.length}</FooterText>
            </FooterCol>
          </Row>
          <Row>
            <FooterCol>
              <FooterHeading variant="secondary"># of Datapoints</FooterHeading>
              <FooterText variant="primary">{count}</FooterText>
            </FooterCol>
            <FooterCol>
              <FooterHeading variant="secondary">Latest Block</FooterHeading>
              <FooterText variant="primary">
                {latestBlock}
                {age && <Tooltip content={`${age} blocks old data`} />}
              </FooterText>
            </FooterCol>
          </Row>
        </Footer>
      </Content>
    </Wrapper>
  );
};

export default TickerItem;
