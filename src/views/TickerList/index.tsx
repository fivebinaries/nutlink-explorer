import React from 'react';
import styled from 'styled-components';
import { Card, Layout, TickerItem, Text } from '../../components';
import { useAppSelector } from '../../hooks';

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

const TickerList = () => {
  const { tickers: data, status } = useAppSelector(s => s.tickers);

  return (
    <Layout title="Nutlink Explorer">
      <StyledCard
        heading="Tickers"
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
