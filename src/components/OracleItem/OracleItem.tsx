import React, { useState, useMemo } from 'react';
import styled, { css, useTheme } from 'styled-components';
import BigNumber from 'bignumber.js';
import Skeleton from 'react-loading-skeleton';
import { FiChevronDown, FiChevronUp, FiXOctagon } from 'react-icons/fi';
import { selectOracle } from '../../store/oracles';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { calculateDatapointAvgValue, filterInvalidDatapoints } from '../../utils/data';
import Chart from '../Chart/Chart';
import FiatValue from '../FiatValue/FiatValue';
import Indicator from '../Indicator/Indicator';
import Link from '../Link/Link';
import Pagination from '../Pagination/Pagination';
import Section from '../Section/Section';
import { TickerDatapoint } from '../../types';
import { fetchTickerDatapointsForPool } from '../../store/datapoints';
import { ITEMS_PER_PAGE } from '../../config/main';
import Tooltip from '../Tooltip/Tooltip';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background: #fff;
  overflow: hidden;
  width: 100%;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 50px;
  text-overflow: ellipsis;
  overflow: hidden;

  & + & {
    margin-left: 16px;
  }
`;

const ValueCol = styled(Col)`
  align-items: flex-end;
  flex: 0 1 auto;
  justify-content: center;
`;

const ActionsCol = styled(Col)`
  flex: 0 1 auto;
  justify-content: center;
`;

const Name = styled.span<{ secondary?: boolean }>`
  font-weight: 500;
  font-size: 12px;
  margin-bottom: 4px;
  color: ${props => props.theme.TYPE_DARK_GREY};

  ${props =>
    props.secondary &&
    css`
      color: ${props => props.theme.TYPE_LIGHT_GREY};
      font-style: italic;
    `}
`;

const Address = styled.span`
  font-size: 12px;
  white-space: nowrap;
  color: ${props => props.theme.TYPE_LIGHT_GREY};

  text-overflow: ellipsis;
  overflow: hidden;
`;

const Value = styled.span`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  color: ${props => props.theme.TYPE_DARK_GREY};
`;

const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 2px;
  cursor: pointer;
`;

const Overview = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
`;

const Expanded = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px 0px;
`;

const Datapoints = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const GridSmall = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 150px 1fr;
  padding: 16px;
  /* background: #f5f5f5; */
`;

const SourceName = styled.span`
  font-weight: 500;
  font-size: 12px;
  color: ${props => props.theme.TYPE_DARK_GREY};
`;

const GridLabel = styled.span`
  font-weight: 500;
  font-size: 12px;
  color: ${props => props.theme.TYPE_LIGHT_GREY};
`;

const GridLabelFirst = styled(GridLabel)`
  margin-top: 32px;
  &:nth-child(1) {
    margin-top: 0px;
  }
`;

const SourceValue = styled.span`
  font-weight: 600;
  font-size: 12px;
  color: ${props => props.theme.TYPE_DARK_GREY};
`;

const SourceValueFirst = styled(SourceValue)`
  margin-top: 32px;
  &:nth-child(2) {
    margin-top: 0px;
  }
`;

const ChartWrapper = styled.div`
  display: flex;
  font-size: 12px;
  height: 170px;
  margin: 32px 24px;
`;

const Warning = styled.span`
  color: ${props => props.theme.TYPE_LIGHT_GREY};
  font-size: 12px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

type Props = {
  address: string;
  ticker: string;
};

const getIndicatorVariant = (block: number, latestBlock: number) => {
  const datapointAge = latestBlock - block;
  if (datapointAge < 30) {
    return 'success';
  }
  if (datapointAge < 200) {
    return 'warning';
  }
  return 'danger';
};

const OracleItem = ({ address, ticker, ...rest }: Props) => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState(false);

  const dispatch = useAppDispatch();

  const oracleInfo = useAppSelector(s => selectOracle(s, address));
  const oracleMetadata = oracleInfo?.metadata;
  const blockchainHeight = useAppSelector(s => s.blockchain.latestBlock?.height);

  const tickerData = useAppSelector(s => s.datapoints.datapoints[ticker])?.find(
    e => e.oracleAddress === address,
  );

  const validatedTickerData = filterInvalidDatapoints(tickerData?.datapoints).valid;
  const age =
    blockchainHeight && validatedTickerData.length > 0
      ? blockchainHeight - validatedTickerData[0].block_height
      : null;

  const perPage = ITEMS_PER_PAGE;
  const startIndex = (currentPage - 1) * perPage;
  const stopIndex = startIndex + perPage;

  const slicedDatapoints = useMemo(
    () => tickerData?.datapoints.slice(startIndex, stopIndex),
    [tickerData, startIndex, stopIndex],
  );

  const validatedSlicedTickerData = useMemo(
    () => filterInvalidDatapoints(slicedDatapoints),
    [slicedDatapoints],
  );

  const validTickerData = validatedSlicedTickerData.valid;
  const hasInvalidData = validatedSlicedTickerData.invalid.length > 0;
  const hasValidData = validatedSlicedTickerData.valid.length > 0;

  const latestDatapoint: TickerDatapoint | undefined = validTickerData[0];

  //   avg value computed from alls sources within latest datapoint (one with highest block height)
  const avgValue = tickerData?.datapoints[0]
    ? calculateDatapointAvgValue(filterInvalidDatapoints(tickerData?.datapoints).valid[0])
    : null;

  const onSetPage = (page: number) => {
    setCurrentPage(page);
    dispatch(fetchTickerDatapointsForPool({ oracle: address, ticker, page }));
  };

  return (
    <Wrapper {...rest}>
      <Overview>
        <Col>
          {oracleMetadata?.metadata?.homepage ? (
            <Link href={oracleMetadata?.metadata.homepage} passHref>
              <Name secondary={!oracleMetadata?.metadata?.name}>
                {oracleMetadata?.metadata?.name ?? 'Nameless oracle'}
              </Name>
            </Link>
          ) : (
            <Name secondary={!oracleMetadata?.metadata?.name}>
              {oracleMetadata?.metadata?.name ?? 'Nameless oracle'}
            </Name>
          )}
          {/* <Address>{middleCropFixed(address, 64)}</Address> */}
          <Address>{address}</Address>
        </Col>
        <ValueCol>
          <Value>
            {tickerData ? (
              <>
                {hasValidData && (
                  <>
                    <FiatValue value={avgValue} isNumericString tickerName={ticker} />
                    {blockchainHeight && (
                      <Tooltip content={`${age} blocks old data`}>
                        <Indicator
                          variant={getIndicatorVariant(
                            latestDatapoint.block_height,
                            blockchainHeight,
                          )}
                        />
                      </Tooltip>
                    )}
                  </>
                )}
                {!hasValidData && hasInvalidData && <FiXOctagon size={18} color={theme.TYPE_RED} />}
              </>
            ) : (
              <Skeleton width={100} />
            )}
          </Value>
        </ValueCol>
        <ActionsCol>
          <ActionWrapper onClick={() => setExpanded(!expanded)}>
            {expanded ? <FiChevronUp /> : <FiChevronDown />}
          </ActionWrapper>
        </ActionsCol>
      </Overview>
      {expanded && (
        <Expanded>
          <Section heading="Chart" secondary>
            {!hasValidData && hasInvalidData && <Warning>Oracle submitted invalid data</Warning>}
            {hasValidData && (
              <ChartWrapper>
                <Chart tickerName={ticker} tickerData={validTickerData} />
              </ChartWrapper>
            )}
          </Section>
          <Section heading="Datapoints" secondary>
            {!hasValidData && hasInvalidData && <Warning>Oracle submitted invalid data</Warning>}

            <Datapoints>
              <GridSmall>
                {validTickerData.map(d => (
                  <React.Fragment key={`${d.tx_hash}${d.tx_index}`}>
                    <GridLabelFirst>Block Height</GridLabelFirst>
                    <SourceValueFirst>{d?.block_height}</SourceValueFirst>
                    <GridLabel>TxHash</GridLabel>
                    <SourceValue>{d?.tx_hash}</SourceValue>

                    {d.payload.map(datapoint => (
                      <React.Fragment key={datapoint.source}>
                        <SourceName>{datapoint.source}</SourceName>
                        <SourceValue>
                          <FiatValue
                            tickerName={ticker}
                            value={new BigNumber(datapoint.value).toFixed()}
                            isNumericString
                          />
                        </SourceValue>
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}
              </GridSmall>
            </Datapoints>
            {slicedDatapoints && (
              <PaginationWrapper>
                <Pagination
                  currentPage={currentPage}
                  onPageSelected={onSetPage}
                  isOnLastPage={slicedDatapoints.length < perPage}
                />
              </PaginationWrapper>
            )}
          </Section>
        </Expanded>
      )}
    </Wrapper>
  );
};

export default OracleItem;
