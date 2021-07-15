import React from 'react';
import styled, { DefaultTheme } from 'styled-components';

const IndicatorOuter = styled.div<Pick<Props, 'variant'>>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${props => getIndicatorBgColor(props.theme, props.variant)};
  transition: opacity 0.5s ease, right 0.5s ease;
  margin-left: 6px;
`;

const IndicatorInner = styled.div<Pick<Props, 'variant'>>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => getIndicatorColor(props.theme, props.variant)};
`;

const getIndicatorColor = (theme: DefaultTheme, variant: Props['variant']) => {
  switch (variant) {
    case 'success':
      return theme.TYPE_GREEN;
    case 'warning':
      return theme.TYPE_ORANGE;
    case 'danger':
      return theme.TYPE_RED;
  }
};

const getIndicatorBgColor = (theme: DefaultTheme, variant: Props['variant']) => {
  switch (variant) {
    case 'success':
      return theme.BG_LIGHT_GREEN;
    case 'warning':
      return theme.BG_LIGHT_ORANGE;
    case 'danger':
      return theme.BG_LIGHT_RED;
  }
};

interface Props {
  variant: 'success' | 'warning' | 'danger';
}

const Indicator = ({ variant, ...rest }: Props) => {
  return (
    <IndicatorOuter variant={variant} {...rest}>
      <IndicatorInner variant={variant} />
    </IndicatorOuter>
  );
};

export default Indicator;
