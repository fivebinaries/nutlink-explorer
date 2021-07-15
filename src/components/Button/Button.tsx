import React from 'react';
import styled, { css } from 'styled-components';
import Color from 'color';
const StyledButton = styled.button<Pick<Props, 'variant' | 'size'>>`
  font-size: ${props => (props.size === 'large' ? '14px' : '12px')};
  font-weight: 500;
  padding: ${props => (props.size === 'large' ? '8px 16px' : '4px 8px')};
  border: 1px solid transparent;
  text-align: center;
  white-space: nowrap;
  border-radius: 6px;
  cursor: pointer;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  ${props =>
    props.variant === 'primary' &&
    css`
      background-color: #0168fa;
      border-color: #0168fa;
      color: #fff;

      &:hover,
      &:focus,
      &:active {
        background-color: ${Color('#0168fa').darken(0.07).hex()};
      }
    `}

  ${props =>
    props.disabled &&
    css`
      cursor: auto;
    `};

  ${props =>
    props.variant === 'primary' &&
    props.disabled &&
    css`
      background-color: #0168fa;
      border-color: #0168fa;
    `}

  ${props =>
    props.variant === 'secondary' &&
    css`
      background-color: transparent;
      border-color: #0168fa;
      color: #0168fa;

      &:hover,
      &:focus,
      &:active {
        background-color: #0168fa;
        color: #fff;
      }
    `}

    ${props =>
    props.variant === 'secondary' &&
    props.disabled &&
    css`
      background-color: #f8f9fa;
      border-color: #f8f9fa;
    `}

        ${props =>
    props.variant === 'link' &&
    css`
      background-color: transparent;
      border-color: transparent;
      transition: all 0.2s ease-in-out;
      color: ${props => props.theme.TYPE_DARK_GREY};
      :hover {
        color: #0168fa;
      }
    `}
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'link';
  size?: 'small' | 'large';
}

const Button = ({ children, variant = 'primary', size = 'large', ...rest }: Props) => {
  return (
    <StyledButton variant={variant} size={size} {...rest}>
      {children}
    </StyledButton>
  );
};
export default Button;
