import React from 'react';
import App from 'next/app';
import { store } from '../store';
import { Provider } from 'react-redux';
import GlobalStyles from '../components/Layout/globalStyles';

class Application extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <GlobalStyles />
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default Application;
