import React from 'react';
import { colors } from '../constants';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

const ThemeProvider: React.FC = ({ children }) => {
  return <SCThemeProvider theme={colors.light}>{children}</SCThemeProvider>;
};

export default ThemeProvider;
