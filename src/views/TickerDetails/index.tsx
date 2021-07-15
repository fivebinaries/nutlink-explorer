import React from 'react';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import styled, { css } from 'styled-components';
import { OracleItem, FiatValue, Section, Link } from '../../components';
import Layout from '../../components/Layout/Layout';
import { useAppSelector } from '../../hooks';
import { getTickerAvgValue } from '../../utils/data';

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TickerPage = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 16px;
`;

const Col = styled.div<{ expand?: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  ${props =>
    props.expand &&
    css`
      width: 100%;
    `}
`;

const DetailsWrapper = styled.div`
  display: flex;
  box-shadow: rgb(25 28 31 / 8%) 0px 14px 32px, rgb(25 28 31 / 4%) 0px 8px 16px,
    rgb(25 28 31 / 4%) 0px -1px 0px;
  border-radius: 1rem;
  background: ${props => props.theme.BG_WHITE};
  border-radius: 6px;
  overflow: hidden;
`;

const TickerInfo = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;
  border-right: 1px solid ${props => props.theme.STROKE_GREY};
  background: #e7f1ff69;
  width: 280px;
  height: 100%;
`;

const TickerHeading = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

const TickerName = styled.span`
  font-size: 24px;
  font-weight: 500;
  color: ${props => props.theme.TYPE_DARK_GREY};
`;

const Bullet = styled.span`
  font-size: 24px;
  font-weight: 500;
  margin: 0 0.5ch;
  color: ${props => props.theme.TYPE_DARK_GREY};
`;

const Value = styled.span<{ secondary?: boolean }>`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.TYPE_DARK_GREY};

  ${props =>
    props.secondary &&
    css`
      font-size: 16px;
      font-weight: 500;
    `}
`;

const TickerOracles = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 24px;
`;

const StyledOracleItem = styled(OracleItem)`
  & + & {
    margin-top: 24px;
  }
`;

const TickerDetails = () => {
  const router = useRouter();
  const [tickerName] = router.query.slug || [];
  const selectedTicker = useAppSelector(s => s.tickers.tickers)?.find(d => d.name === tickerName);
  const tickerDatapoints = useAppSelector(s => s.datapoints.datapoints[tickerName]) ?? [];
  const blockchainHeight = useAppSelector(s => s.blockchain.latestBlock?.height);
  const tickerAvgValue = getTickerAvgValue(tickerDatapoints, blockchainHeight);
  const status = useAppSelector(s => s.tickers.status);

  return (
    <Layout title="Nutlink Explorer">
      <TickerPage>
        <TickerHeading>
          <Link href={'/'} passHref>
            <TickerName>Tickers</TickerName>
          </Link>
          <Bullet>•</Bullet>
          <TickerName>{tickerName}</TickerName>
        </TickerHeading>
        <DetailsWrapper>
          <Col>
            <TickerInfo>
              <Section heading="Avg value">
                <Value>
                  {status === 'loaded' ? (
                    <FiatValue value={tickerAvgValue} tickerName={tickerName} />
                  ) : (
                    <Skeleton width={120} />
                  )}
                </Value>
              </Section>
              <Section heading="Latest block" secondary>
                <Value secondary>{selectedTicker?.latest_block ?? <Skeleton width={120} />}</Value>
              </Section>
            </TickerInfo>
          </Col>

          <Col expand>
            <TickerOracles>
              <Section heading="Oracles">
                <Grid>
                  {selectedTicker?.pools.map(pool => (
                    <StyledOracleItem address={pool} ticker={tickerName}></StyledOracleItem>
                  ))}
                </Grid>
              </Section>
              {/* <Section heading="Aggregated data"></Section> */}
            </TickerOracles>
          </Col>
        </DetailsWrapper>
      </TickerPage>
    </Layout>
  );
};

export default TickerDetails;
