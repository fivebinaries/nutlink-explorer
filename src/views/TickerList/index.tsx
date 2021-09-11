import React from 'react';
import styled from 'styled-components';
import { Card, Layout, TickerItem, Text } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeNetwork } from '../../store/blockchain';
import { triggerRefetch } from '../../store/tickers';

const StyledCard = styled(Card)`
  background: none;
  box-shadow: none;
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px;
  text-align: center;
  width: 100%;
`;

const HeadingWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const HeadingCol = styled.div`
  display: flex;
`;

const NetworkSwitchWrapper = styled.div`
  display: flex;
  font-size: 14px;
  align-items: center;
`;

const SwitchLabel = styled.span`
  margin-right: 4px;
`;

const TickerList = () => {
  const dispatch = useAppDispatch();
  const { tickers: data, status } = useAppSelector(s => s.tickers);
  const network = useAppSelector(s => s.blockchain.network);

  return (
    <Layout title={`Nutlink Explorer (${network})`}>
      <StyledCard
        heading={
          <HeadingWrapper>
            <HeadingCol>Tickers</HeadingCol>

            <NetworkSwitchWrapper>
              <SwitchLabel>Network:</SwitchLabel>
              <select
                value={network}
                onChange={e => {
                  dispatch(changeNetwork(e.target.value as 'mainnet' | 'testnet'));
                  dispatch(triggerRefetch());
                }}
              >
                <option value="mainnet">mainnet</option>
                <option value="testnet">testnet</option>
              </select>
            </NetworkSwitchWrapper>
          </HeadingWrapper>
        }
        // description="The most recently mined blocks"
      >
        <ContentWrapper>
          {status === 'loading' && (
            <Loading>
              <Text variant="secondary">Crunching all the data...</Text>
            </Loading>
          )}
          <Grid
          // onClick={() =>
          //     dispatch(
          //         addOracle({ address: 'test', metadata: undefined }),
          //     )
          // }
          >
            {data.map(ticker => {
              return (
                <TickerItem
                  key={ticker.name}
                  ticker={ticker.name}
                  pools={ticker.pools}
                  count={ticker.count}
                  latestBlock={ticker.latest_block}
                />
              );
            })}
          </Grid>
        </ContentWrapper>
      </StyledCard>
    </Layout>
  );
};

export default TickerList;
