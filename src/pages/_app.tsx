import React from 'react';
import App from 'next/app';
import { store } from '../store';
import { Provider } from 'react-redux';
import Head from 'next/head';
import GlobalStyles from '../components/Layout/globalStyles';

class Application extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <script
            defer
            data-domain="explorer.nut.link"
            src="https://plausible.io/js/plausible.js"
          ></script>
        </Head>
        <Provider store={store}>
          <GlobalStyles />
          <Component {...pageProps} />
        </Provider>
      </>
    );
  }
}

export default Application;
