import React, { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import NavigationBar from '../NavigationBar/NavigationBar';
import Footer from '../Footer/Footer';
import ThemeProvider from '../../providers/ThemeProvider';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchAllTickers } from '../../store/tickers';
import { fetchLatestBlock } from '../../store/blockchain';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: #f7fafe;
`;
const Content = styled.div`
  display: flex;
  align-self: center;
  padding: 32px;
  flex: 1;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
`;

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(s => s.tickers);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllTickers());
      dispatch(fetchLatestBlock());
    }
  }, [dispatch, status]);

  return (
    <LayoutWrapper>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ThemeProvider>
        <NavigationBar />
        <Content>{children}</Content>
        <Footer />
      </ThemeProvider>
    </LayoutWrapper>
  );
};

export default Layout;
